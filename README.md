[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]


<h3 align="center">
  <a href="https://seeed-projects.github.io/Rockchip-AI-Lab/">
    Rockchip AI Lab
  </a>
</h3>

<p align="center">
  <img src="src/img/banner.png" alt="Banner" width="100%" />
</p>


# 🛠️ About The Project

This project provides a one-click deployment feature for Rockchip's AI models using Docker on Rockchip development boards, making it easier for developers to perform secondary development.

## 📁 Project Structure

```
Rockchip-AI-Lab/
├── .github/                # GitHub configuration
│   └── workflows/          # GitHub Actions workflows
│       └── deploy.yml      # Deployment workflow configuration
├── node_modules/           # Node.js dependencies
├── public/                 # Built website files (deployed to GitHub Pages)
├── src/                    # Source files
│   ├── content/            # Content files organized by chip model and AI field
│   │   ├── help/           # Help documentation
│   │   │   ├── demo1.md    # Help demo page 1
│   │   │   ├── demo2.md    # Help demo page 2
│   │   │   ├── index.md    # Help main page
│   │   │   └── quick-start.md # Help quick start page
│   │   ├── rk1820/         # Content for RK1820 chip
│   │   │   ├── cv/         # Computer Vision content
│   │   │   ├── llm/        # Large Language Model content
│   │   │   ├── ui/         # User Interface content
│   │   │   └── vlm/        # Visual Language Model content
│   │   ├── rk3576(3588)/         # Content for RK3576/3588 chip
│   │   │   ├── cv/
│   │   │   ├── llm/
│   │   │   ├── ui/
│   │   │   └── vlm/
│   │   ├── rk1820.json     # RK1820 content index configuration
│   │   └── rk3576(3588).json     # RK3576/3588 content index configuration
│   ├── img/                # Image assets
│   ├── js/                 # JavaScript files
│   │   └── app.js          # Main application script
│   ├── index.html          # Main HTML file
│   └── styles.css          # Main stylesheet
├── build.js                # Build script
├── .gitignore              # Git ignore configuration
├── LICENSE                 # License file
├── package-lock.json       # npm lock file
├── package.json            # Project configuration
└── README.md               # This file
```

## 🤝 Contribute

Fork this project and run the project locally:

>💡Note: Every time you modify the `src` folder, you need to run `npm run build` to rebuild.

1. Install dependencies:
   ```bash
   npm install
   ```

2. Build the website:
   ```bash
   npm run build
   ```

3. Start a local server:
   ```bash
   npm start
   ```


## Deployment

The website is automatically deployed to GitHub Pages using GitHub Actions when changes are pushed to the `main` branch.


## 💞 Top contributors:

<a href="https://github.com/Seeed-Projects/Rockchip-AI-Lab/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=Seeed-Projects/Rockchip-AI-Lab" alt="contrib.rocks image" />
</a>

## 🌟 Star History

![Star History Chart](https://api.star-history.com/svg?repos=Seeed-Projects/Rockchip-AI-Lab&type=Date)


[contributors-shield]: https://img.shields.io/github/contributors/Seeed-Projects/Rockchip-AI-Lab.svg?style=for-the-badge
[contributors-url]: https://github.com/Seeed-Projects/Rockchip-AI-Lab/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/Seeed-Projects/Rockchip-AI-Lab.svg?style=for-the-badge
[forks-url]: https://github.com/Seeed-Projects/Rockchip-AI-Lab/network/members
[stars-shield]: https://img.shields.io/github/stars/Seeed-Projects/Rockchip-AI-Lab.svg?style=for-the-badge
[stars-url]: https://github.com/Seeed-Projects/Rockchip-AI-Lab/stargazers
[issues-shield]: https://img.shields.io/github/issues/Seeed-Projects/Rockchip-AI-Lab.svg?style=for-the-badge
[issues-url]: https://github.com/Seeed-Projects/Rockchip-AI-Lab/issues
[license-shield]: https://img.shields.io/github/license/Seeed-Projects/Rockchip-AI-Lab.svg?style=for-the-badge
[license-url]: https://github.com/Seeed-Projects/Rockchip-AI-Lab/blob/master/LICENSE.txt
[product-screenshot]: images/screenshot.png
[Python.js]: https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white
[Python-url]: https://www.python.org/

[Raspberry Pi.js]: https://img.shields.io/badge/Raspberry%20Pi-A22846?style=for-the-badge&logo=raspberry-pi&logoColor=white
[Raspberry Pi-url]: https://www.raspberrypi.com/

[HAILO.js]: https://img.shields.io/badge/HAILO-blue?style=for-the-badge&logo=https://hailo.ai/wp-content/uploads/2023/08/Hailo.png&logoColor=white
[HAILO-url]: https://hailo.ai/


[Seeed Studio.js]: https://img.shields.io/badge/SeeedStudio-green?style=for-the-badge&logo=<https://media-cdn.seeedstudio.com/media/logo/stores/4/logo_2018_horizontal.png>&logoColor=white
[Seeed Studio-url]: https://www.seeedstudio.com/

[Node Red.js]: https://img.shields.io/badge/Node-RED-%2300B4A0?style=for-the-badge&logo=node-red&logoColor=white
[Node Red-url]: https://nodered.org/

[TensorFlow.com]: https://img.shields.io/badge/TensorFlow-2.17-orange?logo=tensorflow
[TensorFlow-url]: https://www.tensorflow.org/

[OpenCV.com]: https://img.shields.io/badge/OpenCV-v4.5.3-blue?logo=opencv
[OpenCV-url]: https://opencv.org/

[Pytorch.com]: https://img.shields.io/badge/PyTorch-v1.12.0-red?logo=pytorch
[Pytorch-url]: https://pytorch.org/
