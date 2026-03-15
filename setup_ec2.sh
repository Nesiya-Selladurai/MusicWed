#!/bin/bash

# Update package list
sudo apt-get update

# Install K3s (Lightweight Kubernetes)
curl -sfL https://get.k3s.io | sh -

# Allow current user to access k3s config
sudo chmod 644 /etc/rancher/k3s/k3s.yaml
mkdir -p ~/.kube
sudo cp /etc/rancher/k3s/k3s.yaml ~/.kube/config
sudo chown $(id -u):$(id -g) ~/.kube/config

# Install Docker-compatible CLI (k3s uses containerd)
# Alternatively, install Docker if needed for building locally (though GH Actions builds now)
# For this setup, we just need kubectl which is installed with k3s

echo "K3s installed successfully. Your cluster is ready."
echo "You can check the status with: kubectl get nodes"
