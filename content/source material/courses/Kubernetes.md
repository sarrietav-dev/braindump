---
tags:
  - software
  - devops
---
Kubernetes (k8s) es una tecnología que ayuda al despliegue, escalabilidad y gestión de aplicaciones distribuida de manera eficiente.

> [!question] Cómo ayuda a la escalabilidad y a la disponibilidad exactamente?

Es usado por grandes compañías como Netflix, Spotify, entre otras.

Es como un orquestador:
- Si un músico deja de tocar, lo reemplaza por otro.
- Si la audiencia aumenta, el orquestador aumenta el número de músicos.

> [!question] Explicar exactamente qué es un orquestador.

> [!question] Cuáles alternativas hay para k8s?

> [!question] Cuáles son las ventajas y desventajas de usar k8s en un proyecto?

> [!question] Cuándo usar y no usar k8s?

# Instalación en local

## Instalar kubectl
Kubectl es una herramienta para ejecutar comandos en clústeres de k8s. [Link de como instalar](https://kubernetes.io/docs/tasks/tools/#kubectl).

## Instalar minikube
Minikube es una instancia local de k8s que nos permite aprender y desarrollar de forma fácil en k8s. [Link de como instalar](https://minikube.sigs.k8s.io/docs/start/?arch=%2Flinux%2Fx86-64%2Fstable%2Fbinary+download).

# Iniciar el cluster

Para poder crear un clúster y configurarlo en kubectl, hay que ejecutar este comando.

```
minikube start --driver=docker
```

Esto creará un clúster llamado `minikube` y un namespace llamado `default`

> [!todo] Expandir en **drivers**

Podemos revisar los nodos usando `kubectl get nodes` y, ya que estamos usando Docker, podemos revisar el contenedor que se está ejecutando usando `docker ps`.

## Add-ons

Minikube nos proporciona diferentes add-ons que podemos instalar en nuestro clúster. Para comprobar cuales son podemos ejecutar `minikube addons list`.

Hay dos add-ons importantes que se tienen que instalar que son `registry` para habilitar el registro local y `metrics-server` para habilitar el servidor de métricas. Para esto, usamos los siguientes comandos:

```
minikube addons enable registry
minikube addons enable metrics-server
```

Un comando útil es `eval $(minikube docker-env)` que nos permite usar Docker para ver qué componentes están instalados en minikube (como por ejemplo las imágenes).

El comando `kubectl config get-contexts` nos permite saber en qué clúster estamos ejecutando los comando (por ejemplo, en la máquina local o en una remota). Para cambiar de contexto podemos usar el comando `kubectl config set-context NOMBRE_CONTEXTO`

> [!todo] Expandir en **contextos** de Docker

Para ejecutar un contenedor de ejemplo, podemos usar:

```
kubectl run hello-cloud --image=gcr.io/google-samples/hello-app:2.0 --restart=Never --port=8080
```

Una utilidad que podemos usar a la hora de usar k8s con minikube es el dashboard web:

```
minikube dashboard
```

# Partes principales

## Clústeres

Un clúster es un conjunto de nodos, los cuales ejecutan aplicaciones en contenedores gestionados por un *Control Plane*.

> [!tip] Crear uno o dos nodos maestros por clúster y múltiples nodos workers para garantizar alta disponibilidad, capacidad de ejecución y operación.

## Namespaces

Los *namespaces* nos ayudan a nombrar o categorizar los recursos de un cluster de forma lógica. Por ejemplo podemos tener un namespace por tipo de aplicación como back-end o front-end, o por equipo como *payments* o *profiles*.

## Nodos

Existen dos tipos de nodos: maestros y workers.

### Maestros

- Gestionan el clúster.
- Se aseguran que todo esté funcionando en armonía
- Son como la central de operaciones.

#### API Server
Esta es la interfaz principal del cluster. Se asegura que todas las solicitudes (tanto externas como internas) sean procesadas correctamente.

#### etcd
Base de datos llave-valor que almacena el estado del cluster. Asegura que el cluster siempre tenga un registro actualizado de su estado.

#### Scheduler
Asigna los pods a los nodos workers segun los recursos disponibles.

#### Controller manager
Supervisa el estado de los recursos y asegura que coincidan con el estado deseado. Si un pod falla, este componente se asegura de que se cree uno nuevo.

### Workers
- Ejecutan las aplicaciones
- Hacen el trabajo pesado
- Usan Docker

#### Kubelet
Se comunica con el nodo maestro para recibir instrucciones y reportar el estado del worker.

#### kube-proxy
Se encarga de las reglas de red y balanceo de carga.

## Pods

Es la unidad más básica y mínima de ejecución en k8s. Contiene uno o más contenedores. Si un nodo falla, los pods se redistribuyen para mantener el servicio.

Cada pod tiene una IP única dentro del clúster.

## Servicios

Son componentes instalables en un clúster, los cuales facilitan la comunicación entre diferentes partes de la aplicación y el exterior.

Definen un conjunto de pods y una política de acceso. 

Un ejemplo de servicio sería redirigir tráfico del front a un grupo de pods del back.

De los servicios más usados son ClusterIP, NodePort, LoadBalancer y ExternalName.