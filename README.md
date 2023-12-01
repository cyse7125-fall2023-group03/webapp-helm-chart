# webapp-helm-chart

Helm charts creation and Uploading the *.tgz into the releases by Using Jenkins pipeline using semantic release.
Helm charts are used to maintain the templates used to create the Kubernetes cluster in the cloud provider(GCP).

# Steps

To run the helm charts use cmds below:
- cd into the project repo directory
- helm install --generate-name ./ (to install)
- helm uninstall ${releasename} (to destroy/uninstall)
