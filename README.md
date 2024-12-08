# I Don’t Know Spanish

Your go-to browser extension for translating text on the fly using DeepL’s exceptional translation services.

## Features
- 🌍 Universal Translations: Translate text from or to any language supported by DeepL.
- 🎨 Beautiful UI: Designed with Shadcn and TailwindCSS for an intuitive experience.
- ✍️ Formality Options: Adjust the tone of translations to formal or informal.
- 🚀 Instant Access: Highlight text on any webpage and get translations without leaving the site.
- 🔧 Customizable Settings: Choose your source and target languages with ease.

## Installation
  
  1. Clone the repository:
  ```git
   git clone https://github.com/NotVadusha/I-don-t-speak-Spanish.git
  ```
  2. Load the extension into your browser:
  - For Chrome-based browsers:
    - Open chrome://extensions/.
    - Enable Developer mode.
    - Click Load unpacked and select the project folder.
  - For Firefox:
    - Go to about:debugging#/runtime/this-firefox.
    - Click Load Temporary Add-on and select the manifest.json file.

## Usage

- Highlight the text you want to translate.
- Right-click and select “Translate selection” from the context menu.
- View the translated text in the popup, customized to your language and tone preferences.

## Configuration

- Open the extension’s popup to set:
  - Source Language: Choose the original text language.
  - Target Language: Select the language you want the translation in.
  - Formality: Adjust the tone (formal/default/informal).

## Before start

The app is using free version of the DeepL API so, we need to get DeepL API Key:
- Register on the [DeepL API](https://www.deepl.com/en/pro-api)
- Copy API key from your profile (it will be ready after registration proccess)
- Insert the API key for the `PLASMO_PUBLIC_TRANSLATION_KEY=` .env field.
- If your key if for the free API version, set the `PLASMO_PUBLIC_IS_PRO` .env key to the false.

An example of the .env file can be found in the .env.example file

## Development Setup

- Install/Use correct node version (node 20.17):
  ```bash
    nvm install
    nvm use
  ```
- Install dependencies:
  ```bash
    yarn
  ```
- Start the development server:
  ```bash
    yarn run dev
  ```
  Feel free to use npm / pnpm as well with `npm install` and `npm run dev`
  

## Making production build

Run the following:

```bash
yarn build
# or
npm run build
```

This should create a production bundle for your extension, ready to be zipped and published to the stores.

The easiest way to deploy your Plasmo extension is to use the built-in [bpp](https://bpp.browser.market) GitHub action. Prior to using this action however, make sure to build your extension and upload the first version to the store to establish the basic credentials. Then, simply follow [this setup instruction](https://docs.plasmo.com/framework/workflows/submit) and you should be on your way for automated submission!

## Contributing

Have ideas for improving “I Don’t Know Spanish”? Contributions are welcome! Submit an issue or a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgments

- DeepL API for powering translations.
- Shadcn and TailwindCSS for the UI framework.
