# Audio de las demostraciones de Natalia

El carrusel reproduce únicamente las intervenciones de Natalia. Las frases del
cliente se muestran como texto y usan una pausa de lectura estimada.

## Archivos

- `natalia-clips.json`: manifiesto generado con texto, industria y archivo.
- `keyboard.mp3`: efecto corto usado antes de una consulta por industria.
- `<industria>/natalia-*.mp3`: respuestas generadas con la voz Fish Audio
  configurada en `.env`.

El navegador exige una interacción antes de reproducir sonido. Por eso cada
card muestra `Activar audio`; al pulsarlo, la conversación actual reinicia y
queda sincronizada con la duración real de cada MP3.

## Regeneración

Desde `backend`:

```bash
npm run web:demo-audio
```

El comando conserva clips existentes. Para regenerarlos todos:

```bash
npm run web:demo-audio -- --force
```

La fuente de textos está en
`backend/src/services/generateWebDemoAudio.ts` y debe mantenerse idéntica al
guion de `web/js/call-carousel.js`.
