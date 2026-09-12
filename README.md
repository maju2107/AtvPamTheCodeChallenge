# Atividade Prática: The Code Challenge — Hardware e Recursos Nativos

# 📱AgroCheck

Sistema Mobile de Registro e Auditoria de Visitas Técnicas Agrícolas.

## Funcionalidades

Este projeto foi estruturado para contemplar os requisitos: consulta de contatos por páginas, filtro nativo por `name`, `TextInput` com debounce e `FlatList` otimizada para evitar carregar milhares de registros de uma vez.

## Instalação

Recomendado: Node.js 22.13+ para Expo SDK 57.

```bash
npm install
npx expo start
```

Para Android:

```bash
npx expo start --android
```

Para testar câmera, localização, sensores e contatos, prefira um dispositivo físico.

## Estrutura

- `src/screens`: telas
- `src/components`: componentes reutilizáveis
- `src/services`: integração com APIs nativas
- `src/hooks`: lógica de sensores
- `src/styles`: estilos 

## Observação importante sobre o acelerômetro

O `expo-sensors` fornece `x`, `y` e `z` em unidades de **g**. Portanto, a resultante já pode ser comparada diretamente com `2.0`, sem dividir por 9.81.
