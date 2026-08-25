# WebLarek

WebLarek is a small e-commerce application for browsing products, adding them to a cart and placing an order.

The project is written in TypeScript and uses an MVP-style architecture to keep data, presentation and application logic separated.

## Features

- product catalog loaded from an API;
- product details displayed in a modal window;
- shopping cart management;
- total price calculation;
- checkout flow;
- payment method and delivery information forms;
- form validation;
- order submission to the API.

## Architecture

The application is divided into three main parts:

- **Model** — stores and manages application data;
- **View** — renders interface elements and handles user interaction;
- **Presenter** — connects models and views through application events.

An event-based approach is used to reduce direct dependencies between parts of the application.

## Tech stack

- TypeScript
- HTML
- SCSS
- Vite
- REST API

## Getting started

```bash
git clone https://github.com/person5494/weblarek.git
cd weblarek
npm install
npm run dev
```

Production build:

```bash
npm run build
```

## Project structure

```text
src/
├── components/     UI components and base classes
├── types/          TypeScript types and interfaces
├── utils/          constants and utility functions
├── scss/           styles
└── main.ts         application entry point
```

## About the project

This project was completed as part of the Yandex Practicum Frontend Developer course. It was used to practice TypeScript, API interaction and application architecture.
