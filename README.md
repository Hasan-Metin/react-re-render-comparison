# React Re-render Performance Comparison

An interactive demo comparing how different state management patterns affect component re-renders in React.

[![Live Demo](https://img.shields.io/badge/Live_Demo-Visit-success?style=for-the-badge)](https://hasan-metin.github.io/react-re-render-comparison)

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7+-646CFF?logo=vite&logoColor=white)

## 🎯 What is this?

A hands-on learning tool to understand React re-renders. Click buttons, watch render counts change, and see the real performance difference between patterns.

## 📊 Patterns Compared

| Pattern | Performance | Best For |
|---------|-------------|----------|
| **Self-Driven** | ⭐⭐⭐ Best | Independent widgets |
| **Parent-Driven** | ⭐⭐ Good | Coordinated components |
| **Context-Driven** | ⭐ Worst | Themes, auth, locale |

## 🚀 Quick Start

```bash
npm install
npm run dev
```

## 📖 Learn More

Run the app and visit the **Overview** page for detailed explanations, performance comparisons, and source code for each pattern.

## 📄 License

MIT
