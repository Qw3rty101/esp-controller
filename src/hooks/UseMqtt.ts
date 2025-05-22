// src/hooks/useMqtt.ts
import { useEffect, useState } from 'react';
import mqtt, { MqttClient } from 'mqtt';

export const useMqtt = () => {
   const [client, setClient] = useState<MqttClient | null>(null);
   const [messages, setMessages] = useState<string[]>([]);
   const [status, setStatus] = useState<'Connecting' | 'Connected' | 'Error' | 'Closed'>('Connecting');

   useEffect(() => {
      const mqttClient = mqtt.connect('wss://d7f289168ee84fcf87faf37507bdc8c4.s1.eu.hivemq.cloud:8884/mqtt', {
         username: 'project-web-mqtt',
         password: 'Angeom_313212',
         clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
      });

      setClient(mqttClient);

      mqttClient.on('connect', () => {
         setStatus('Connected');
         console.log('Connected to MQTT Broker');

         mqttClient.subscribe(["weather/rain", "weather/prediction"], (err) => {
            if (err) {
               console.error('Subscribe error:', err);
               setStatus('Error');
            } else {
               console.log('Subscribed to topic/test');
            }
         });
      });

      mqttClient.on('message', (topic, message) => {
         const msg = message.toString();
         console.log(`Message on ${topic}: ${msg}`);
         setMessages((prev) => [...prev, msg]);
      });

      mqttClient.on('error', (err) => {
         console.error('MQTT Error:', err);
         setStatus('Error');
      });

      mqttClient.on('close', () => {
         console.log('MQTT Connection closed');
         setStatus('Closed');
      });

      return () => {
         mqttClient.end();
      };
   }, []);

   return { client, messages, status };
};
