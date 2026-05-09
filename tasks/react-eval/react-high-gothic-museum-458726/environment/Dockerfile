FROM mcr.microsoft.com/playwright/python:v1.59.0-noble

ENV PIP_BREAK_SYSTEM_PACKAGES=1
ENV DEBIAN_FRONTEND=noninteractive

# Python grader deps (same as vanilla)
RUN python3 -m pip install --no-cache-dir \
    "playwright==1.59.0" \
    "Pillow==12.2.0" \
    "scikit-image==0.26.0" \
    "beautifulsoup4==4.14.3" \
    "lxml==6.1.0"
RUN python3 -m playwright install chromium
RUN python3 -c "import playwright, skimage, bs4, lxml, PIL"

# Node 20 for Vite. NodeSource setup script handles apt-key + sources.list.
RUN apt-get update && apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y --no-install-recommends nodejs && \
    apt-get clean && rm -rf /var/lib/apt/lists/* && \
    node --version && npm --version

# Pre-cache the React project's node_modules at image build time. The
# project skeleton (package.json + lockfile) is COPYd in, then we run
# `npm ci` against it. node_modules ends up baked into the image, so
# every Modal trial starts with `npm install` already done.
WORKDIR /app
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
RUN npm ci --no-audit --no-fund --silent

# Now the rest of the project skeleton + agent inputs.
COPY vite.config.ts /app/vite.config.ts
COPY tsconfig.json /app/tsconfig.json
COPY index.html /app/index.html
COPY design-system.css /app/design-system.css
COPY src /app/src
COPY screenshots/ /app/screenshots/
COPY motifs/ /app/motifs/
COPY video[s]/ /app/videos/

RUN mkdir -p /app/output
