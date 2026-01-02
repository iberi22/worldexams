# 🧪 Protocolo de Pruebas Manuales - Party Mode & Anti-Cheat

Este documento describe los pasos para validar profesionalmente las nuevas funcionalidades de **Party Mode Optimizado (P2P Star)** y **Sistema Anti-Cheat**.

## 📋 Requisitos Previos
- 2 Dispositivos (o 1 PC con 2 navegadores diferentes, ej: Chrome y Firefox)
- Conexión a la misma red WiFi (ideal para probar velocidad LAN)
- Proyecto corriendo (`npm run dev`)

## 🚀 Escenario 1: Velocidad y Sincronización (P2P Star)

**Objetivo:** Verificar que la latencia es mínima y que la topología estrella funciona (Guests no se saturan).

1.  **Host (Chrome):**
    *   Ve a `/party`.
    *   Crea una nueva sala.
    *   Copia el código (ej: `ABC123`).
2.  **Guest (Firefox/Móvil):**
    *   Ve a `/party`.
    *   Ingresa el código y un nombre (ej: "Estudiante 1").
    *   **Prueba:** La conexión debe ser casi instantánea (< 2 seg).
3.  **Host:**
    *   Inicia el examen.
    *   **Prueba:** El examen debe iniciar en el Guest inmediatamente.
4.  **Sincronización:**
    *   En el Host, avanza a la pregunta 2.
    *   **Prueba:** El Guest debe saltar a la pregunta 2 automáticamente (si está configurado para seguir al host) o recibir la actualización de estado.

## 🛡️ Escenario 2: Sistema Anti-Cheat (Focus Tracker)

**Objetivo:** Verificar que el sistema detecta cuando un estudiante intenta hacer trampa (cambiar de pestaña).

1.  **Preparación:**
    *   Tener el examen en curso (paso anterior).
2.  **Guest (El "Tramposo"):**
    *   Abre una nueva pestaña en el navegador (ej: Google).
    *   O minimiza la ventana del examen.
    *   Espera 2-3 segundos.
    *   Vuelve al examen.
    *   **Prueba:** Deberías ver un aviso fugaz "⚠️ Mantén el foco en el examen".
3.  **Host (El Profesor):**
    *   **Prueba:** En la esquina superior derecha, debe aparecer una notificación roja: `⚠️ Estudiante 1 perdió el foco!`.
4.  **Resultados:**
    *   Finaliza el examen en el Host.
    *   En la pantalla de resultados, busca la tarjeta "Resumen de Concentración".
    *   **Prueba:** Debe mostrar **1 Usuario Distraído** y en la lista individual, "Estudiante 1" debe tener una marca roja con el número de distracciones.

## ⚡ Escenario 3: Rendimiento (Stress Test Ligero)

**Objetivo:** Simular carga.

1.  Si es posible, conecta 3-4 dispositivos (móviles, tablets).
2.  Todos como Guests.
3.  El Host cambia de preguntas rápidamente.
4.  **Prueba:** Ningún dispositivo debe "congelarse". La CPU de los Guests debe mantenerse baja porque ya no procesan mensajes de otros Guests (gracias a la optimización Star Topology).

## 🐛 Solución de Problemas

*   **No conecta:** Verifica que no haya VPNs activas. El sistema usa STUN de Google, pero firewalls corporativos estrictos pueden bloquear WebRTC.
*   **No alerta:** El evento `blur` a veces no se dispara si solo haces click fuera de la ventana sin minimizarla. Asegúrate de cubrir la ventana completamente o cambiar de pestaña.
