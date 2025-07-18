---
tags:
  - software
  - devops
---

# Kubernetes

Kubernetes (k8s) is a technology that helps efficiently deploy, scale, and manage distributed applications.

> [!question] How exactly does it help with scalability and availability?

It is used by large companies such as Netflix, Spotify, among others.

It acts like an orchestrator:
- If one musician stops playing, it replaces them with another.
- If the audience grows, the orchestrator increases the number of musicians.

> [!question] What exactly is an orchestrator?

> [!question] What alternatives are there to k8s?

> [!question] What are the pros and cons of using k8s in a project?

> [!question] When to use and when not to use k8s?

# Local Installation

## Installing kubectl
`kubectl` is a tool for running commands against k8s clusters. [Installation guide](https://kubernetes.io/docs/tasks/tools/#kubectl).

## Installing Minikube
Minikube is a local k8s instance that lets you learn and develop easily. [Installation guide](https://minikube.sigs.k8s.io/docs/start/?arch=%2Flinux%2Fx86-64%2Fstable%2Fbinary+download).

# Starting the Cluster

To create a cluster and configure it for kubectl, run:
```bash
minikube start --driver=docker
```
This creates a cluster named `minikube` and a `default` namespace.

> [!todo] Expand on **drivers**.

Check nodes with `kubectl get nodes`, and since Minikube runs in Docker, view the container with `docker ps`.

## Add-ons

Minikube provides various add-ons. List them with:
```
minikube addons list
```
Install key add-ons:
```
minikube addons enable registry
minikube addons enable metrics-server
```

Use:
```
eval $(minikube docker-env)
```
to point Docker commands at Minikube’s Docker daemon.

Switch contexts if needed:
```
kubectl config get-contexts
kubectl config set-context <CONTEXT_NAME>
```

> [!todo] Expand on Docker **contexts**.

Run a sample container:
```
kubectl run hello-cloud --image=gcr.io/google-samples/hello-app:2.0 --restart=Never --port=8080
```

Launch the Minikube dashboard:
```
minikube dashboard
```

# Core Components

## Clusters

A cluster is a set of nodes running containerized applications managed by a *Control Plane*.

> [!tip] Create one or two master nodes per cluster and multiple worker nodes for high availability and workload distribution.

## Namespaces

*Namespaces* provide logical partitioning of cluster resources (e.g., separate namespaces for backend, frontend, payments, profiles).

## Nodes

Two node types: masters and workers.

### Master Nodes
- Manage cluster state.
- Ensure harmony across the cluster.
- Act as the central operations layer.

#### API Server
The primary API interface for the cluster, processing all internal and external requests.

#### etcd
A key-value store that holds the cluster state.

#### Scheduler
Assigns pods to worker nodes based on resource availability.

#### Controller Manager
Monitors resource state and ensures it matches the desired state. Recreates pods when they fail.

### Worker Nodes
- Run applications.
- Perform the work.
- Use Docker.

#### Kubelet
Communicates with the master node to receive instructions and report status.

#### kube-proxy
Handles network rules and load balancing.

## Pods

The smallest deployable units in k8s, containing one or more containers. Pods get redistributed on node failure.

Each pod has a unique IP within the cluster.

## Services

Cluster components that enable communication between application parts and external networks.
Define a set of pods and an access policy (e.g., ClusterIP, NodePort, LoadBalancer, ExternalName).