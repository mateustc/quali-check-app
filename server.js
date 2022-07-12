import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './src/app/app.module';

const express = require('express');
const app = express();
const PORT = process.env.PORT || 8081;

enableProdMode();

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));

app.listen(PORT, () =>
  console.log(`Application is listening on port ${PORT}!`)
);
