# Microsoft's official Playwright Python image — has Playwright + Chromium
# pre-installed plus system fonts. We *also* explicitly re-install every
# Python dep we need; this is cheap (mostly hits pip's cache) and removes
# any ambiguity about which python interpreter sees which packages.
FROM mcr.microsoft.com/playwright/python:v1.59.0-noble

ENV PIP_BREAK_SYSTEM_PACKAGES=1
ENV DEBIAN_FRONTEND=noninteractive

# All Python deps the grader needs. Pinned for reproducibility.
RUN python3 -m pip install --no-cache-dir \
    "playwright==1.59.0" \
    "Pillow==12.2.0" \
    "scikit-image==0.26.0" \
    "beautifulsoup4==4.14.3" \
    "lxml==6.1.0"

# Make sure Chromium is installed for `python3 -m playwright`. The base image
# already has it but re-running is idempotent.
RUN python3 -m playwright install chromium

# One-line build-time sanity: every grader dep imports cleanly.
RUN python3 -c "import playwright, skimage, bs4, lxml, PIL"

# Agent's workspace
WORKDIR /app
RUN mkdir -p /app/output

# Agent inputs only — visible to the agent at /app/.
# Ground truth is intentionally NOT in this image; Harbor mounts it via tests/
# and solution/ only at verifier / oracle execution time.
COPY screenshots/ /app/screenshots/
COPY motifs/ /app/motifs/
