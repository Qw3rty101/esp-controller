import { useEffect, useRef } from "react";
import { LocalNotifications } from "@capacitor/local-notifications";

type Props = {
  conditionNow?: string;
  predictedText?: string;
};

const ShowNotification = ({ conditionNow, predictedText }: Props) => {
  const hasNotified = useRef({
    conditionNow: "",
    predictedText: "",
    suspicious: false,
  });

  useEffect(() => {
    const triggerNotif = async (id: number, title: string, body: string) => {
      await LocalNotifications.requestPermissions();
      await LocalNotifications.schedule({
        notifications: [
          {
            id,
            title,
            body,
            schedule: { at: new Date(Date.now() + 500) },
          },
        ],
      });
    };

    // === CASE 1: Deteksi mencurigakan (sensor bilang hujan, prediksi bilang tidak) ===
    if (
      (conditionNow === "drizzle" || conditionNow === "heavy_rain") &&
      predictedText === "Tidak ada hujan dalam waktu dekat" &&
      !hasNotified.current.suspicious
    ) {
      triggerNotif(
        1003,
        "⚠️ Deteksi Hujan Tidak Pasti",
        "Sensor mendeteksi air, tapi cuaca tidak menunjukkan hujan. Apakah benar sedang turun hujan?"
      );
      hasNotified.current.suspicious = true;
    }

    // === CASE 2: Notifikasi kondisi saat ini ===
    if (
      conditionNow &&
      hasNotified.current.conditionNow !== conditionNow
    ) {
      let title = "Cuaca Saat Ini";
      let body = "";

      if (conditionNow === "heavy_rain") {
        body = "🚨 Hujan deras terjadi sekarang!";
      } else if (conditionNow === "drizzle") {
        body = "🌧 Terjadi gerimis di lokasi Anda.";
      } else if (conditionNow === "no_rain") {
        body = "☀️ Tidak ada hujan. Cuaca cerah.";
      } else {
        body = `🌤 Kondisi cuaca: ${conditionNow}`;
      }

      triggerNotif(1001, title, body);
      hasNotified.current.conditionNow = conditionNow;
    }

    // === CASE 3: Notifikasi prediksi cuaca ===
    if (
      predictedText &&
      hasNotified.current.predictedText !== predictedText
    ) {
      const title = "Prediksi Cuaca";
      const body = predictedText;

      triggerNotif(1002, title, body);
      hasNotified.current.predictedText = predictedText;
    }
  }, [conditionNow, predictedText]);

  return null;
};

export default ShowNotification;
