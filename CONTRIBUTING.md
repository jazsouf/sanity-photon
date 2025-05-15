# Contributing to Sanity Photon

Thank you for your interest in contributing to Sanity Photon! This document provides guidelines and instructions for contributing to this project.

## Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct: be respectful, considerate, and constructive in all communications and contributions.

## How to Contribute

### Reporting Bugs

If you find a bug, please create an issue with:

- A clear, descriptive title
- Steps to reproduce the bug
- Expected behavior
- Actual behavior
- Screenshots if applicable
- Environment information (OS, browser, etc.)

### Suggesting Enhancements

For feature requests:

- Use a clear, descriptive title
- Provide detailed description of the suggested enhancement
- Explain why this enhancement would be useful
- Include examples of how it would be used
- Add any references or examples from other projects

### Pull Requests

1. Fork the repository
2. Create a new branch for your feature or bugfix (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests and linting to ensure quality
5. Commit your changes with clear, descriptive messages following [conventional commits](https://www.conventionalcommits.org/) format
6. Push to your branch
7. Submit a pull request to the `main` branch

### Pull Request Guidelines

- Update documentation for any changed functionality
- Add tests for new features
- Maintain the project's code style
- Keep pull requests focused on a single concern
- Reference relevant issues in the PR description

## Development Workflow

### Setting Up Your Environment

1. Clone your fork of the repository
2. Install dependencies: `npm install`
3. Copy `.env.example` files to proper `.env` files and fill in values
4. Start the development environment: `npm run dev`

### Project Structure

- `/studio` - Sanity Studio configuration
- `/storefront` - Next.js frontend application
- Documentation files are in the root directory

### Testing

- Run tests before submitting a PR
- Add relevant tests for your changes

### Documentation

- Update README.md if your changes affect usage or installation
- Document new features or changed behavior
- Update code comments for clarity

## Release Process

The maintainers will handle the release process, but here's how it works:

1. Changes are merged into `main`
2. Maintainers prepare a new release
3. Version is bumped according to semantic versioning
4. Release notes are generated
5. A new tag is created
6. The release is published

## Getting Help

If you need help with your contribution:

- Comment on the relevant issue or PR
- Reach out to the maintainers

## License

By contributing to Sanity Photon, you agree that your contributions will be licensed under the project's [MIT License](LICENSE).