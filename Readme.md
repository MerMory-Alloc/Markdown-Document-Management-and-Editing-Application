# React Markdown Document Management and Editing Application - Documentation

# Introduction

This documentation provides an overview of a React application that allows users to manage and edit documents in a Markdown format. The application consists of multiple components that work together to provide a user-friendly interface for document management, editing, and previewing. 

## links

live URL: [Markdown Document Management and Editing Application](https://boisterous-banoffee-de9a9c.netlify.app/)

## App Component

The App component represents the main application page and manages the state of the documents, current document, preview mode, menu drawer, viewport width, and modal. It uses several useEffect hooks to set up the initial state, save the current document, and handle window resize events. Additionally, it defines helper functions for searching documents, saving changes, checking object equality, deleting documents, toggling the modal state, and toggling the preview mode. The App component renders UI components such as the modal, toast, menu drawer, navigation bar, container, editor, and preview.

## Editor Component

The Editor component is a functional component that renders an editor interface for editing Markdown text. It accepts props such as `actprev` to control the rendering of the preview button, `showAndHide` as a callback function for toggling the preview mode, text as the initial textarea content, and `onChange` as a callback function for handling textarea content changes.

## Preview Component

The Preview component is a functional component that displays a preview of text content. It receives the text prop, which contains the text content to be rendered in the preview.

## MyModal Component

The MyModal component is a functional component that displays a modal with a confirmation message and two buttons: "Dismiss" and "Delete". It accepts props for the `dismiss` and `delete` functions, which are triggered when the corresponding buttons are clicked.

## Nav Component

The Nav component is a component that renders a navigation bar. It provides a user-friendly interface for navigating and interacting with a document. It receives props such as `toggle` for toggling the menu open/close state, `isMenuOpen` to indicate the current state of the menu, `docName` to display the document name in the navigation bar, `delete` for handling document deletion, and `save` for handling document saving. Additionally, it defines a helper function `trimString` for truncating the document name if it exceeds 20 characters.

## Drawer Component

The Drawer component is a functional component that renders a drawer interface for displaying a list of documents and providing options to edit and rename each document. It manages state variables such as `isEditing` and `text` using the useState hook and defines event handler functions for editing, input changes, dismiss actions, and rename completion. The Drawer component updates the `isEditing` state variable whenever the `props.documents` array changes and returns a JSX element representing the UI for the drawer component.

## Dependencies

- uuid: This library is used to generate unique identifiers (UUIDs). it is specifically used to generate a new UUID for each document created.

- react-modal: This library provides a modal component, it is used to create a modal that maks sure users want to delete a document.

- react-hot-toast: This library provides a toast notification system for displaying temporary messages to the user.it is used to show toast notifications for indicating successful document save or deletion.

## Conclusion

The React Markdown Document Management and Editing Application provides a comprehensive solution for managing and editing Markdown documents. The App component serves as the main entry point, coordinating the state management and rendering of various components such as the Editor, Preview, MyModal, and Nav. Each component has its specific purpose and props, allowing for seamless interaction and intuitive user experience. This application showcases the power and flexibility of React in building sophisticated document management tools.

The design of the app is inspired by this chalenge on [Fronted Mentor](https://www.frontendmentor.io/challenges/inbrowser-markdown-editor-r16TrrQX9)