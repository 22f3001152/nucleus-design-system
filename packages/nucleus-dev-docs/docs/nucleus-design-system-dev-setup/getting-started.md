---
sidebar_position: 1
---

# Setup

### Overview

**Introduction**: The Nucleus design system is aimed at establishing a foundational project for expediting the creation of design systems. It encompasses a series of steps, commencing with the establishment of the repository and culminating in the documentation of the generated assets. This initiative aims to streamline the process for development teams, allowing them to efficiently set up an instance and tailor configurations to meet their specific requirements.

**Scope**: The project's main objective is to harness web components in constructing components that seamlessly function across different frameworks such as React, Angular, and Vue. Additionally, it aims to expand the Storybook documentation to cover these versatile components comprehensively. Subsequently, the plan is to incorporate scaffold projects tailored for these frameworks, pre-embedded with the components for effortless integration and immediate use.

**Prerequisite**

## Prerequisites for Nucleus Design System

**Software Recommendation**: The document emphasizes essential prerequisites for developers intending to utilize the Nucleus Design System efficiently. It identifies specific software requirements and preferred tools for a seamless development experience:

1. **VS Code Editor**: Recommended as the preferred editor for development due to its versatility and extensive plugin ecosystem, enhancing productivity within the Nucleus Design System environment.

2. **Node.js Version >= 18.18.0**: Ensuring a Node.js version of 18.18.0 or higher is essential for compatibility and optimal functionality with the Nucleus Design System.

3. **npm Version >= 9.8.1**: A minimum npm version of 9.8.1 is advised to complement the Node.js installation and facilitate package management efficiently.


## Project Setup

Follow these steps to set up the Nucleus Design System project:

1. **Clone the repository**: Use the following command to clone the repository:

2. **Install dependencies**: Run the following command to install project dependencies: `npm install` from the root directory. `Nx` will take care of executing the installation of dependencies across all repositories within mono repo.

3. **Build the project**: Execute the following command to build the project: `npm build`


4. **Start Storybook**:
- For Angular: Start Storybook by running:
  ```
  nx storybook sb-nucleus-angular
  ```
  Visit [http://localhost:6006](http://localhost:6006) to view the components and examples for Angular.
  
- For React: Start Storybook by running:
  ```
  nx storybook sb-nucleus-angular
  ```
  Visit [http://localhost:6007](http://localhost:6007) to view the components and examples for React.

### Review and Feedback
If you'd like feedback or comments on a specific document, topic, or project, please provide the content or details you'd like me to focus. We can discuss collaborate and see how we can enhance the project.

You can reach out to me via 
[varad](mailto:varadarajanag@gmail.com)
