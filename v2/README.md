# Kubeflow Pipelines v2

There are two modes Kubeflow Pipelines (KFP) v2 can run in:

* v2 compatible -- supports core v2 features in KFP v1
* v2 (v2 engine) -- full feature v2 in KFP v2's new architecture

Code for both modes live inside this folder.

## Kubeflow Pipelines v2 compatible

Status: [Beta](../docs/release/feature-stages.md#beta)
Documentation: [Introducing Kubeflow Pipelines SDK v2](https://www.kubeflow.org/docs/components/pipelines/sdk/v2/v2-compatibility/)
[Known Caveats & breaking changes](https://github.com/kubeflow/pipelines/issues/6133)
Design: [bit.ly/kfp-v2-compatible](https://bit.ly/kfp-v2-compatible)
Github Project: [KFP v2 compatible mode project](https://github.com/kubeflow/pipelines/projects/13)

Plan:

* [x] 2021 late May - first release
* [ ] 2021 early August (delayed from mid July) - feature complete

## Kubeflow Pipelines v2 engine

Status: not released (WIP)
Design: [bit.ly/kfp-v2](https://bit.ly/kfp-v2) (You need to join [kubeflow-discuss google group](https://groups.google.com/g/kubeflow-discuss) to get access.)
Github Project: [KFP v2 project](https://github.com/kubeflow/pipelines/projects/9)
Tracker Issue: [KFP v2 tracker](https://github.com/kubeflow/pipelines/issues/6110)

Plan:

* [ ] 2021 October - Alpha release
* [ ] TBD - Beta/Stable release

## Developing

### Developing KFP v2 compatible

Prerequisites:

* Install a KFP standalone instance on Google Cloud:

    This does not currently work on other envs, because some tests use GCS & GCS client.
    Welcome contributions to make it portable.

* Configure your own container registry for LAUNCHER_IMAGE_DEV in `.env`:

    ```bash
    export PROJECT=<my-project>
    # .env is a Makefile local config (ignored by git)
    echo "DEV_IMAGE_PREFIX=gcr.io/${PROJECT}/dev/kfp-" > .env
    ```

* Configure sample tests to use your dev image:

    ```bash
    export KFP_LAUNCHER_IMAGE=gcr.io/${PROJECT}/dev/kfp-launcher
    # consider putting this in your .bashrc or .zshrc to persist it.
    ```

Instructions:

1. Build launcher image locally and push to your own registry:

    ```bash
    make image-launcher-dev
    ```

1. Run one sample test:

    ```bash
    python -m samples.path.to.sample_test
    ```

    Read [v2 sample test documentation](./test/README.md) for more details.

### Developing KFP v2

Prerequisites:

* Install go, python, kfp pypi package, docker.

* Configure dev environment by creating a config file called `.env` in this folder,
it should have the following content:

  ```makefile
  DEV_IMAGE_PREFIX=<an container image registry prefix you own>
  ```

  For example:

  ```makefile
  DEV_IMAGE_PREFIX?=gcr.io/ml-pipeline-test/dev/kfp-
  ```

  Then after images are built, they will be pushed to locations like
  `gcr.io/ml-pipeline-test/dev/kfp-driver`.

  The `.env` file is ignored by git, it's your local development configuration.

  Verify you can push images to the registry:

  ```bash
  # push all built dev images to DEV_IMAGE_PREFIX
  make image-dev
  ```

* [Connecting to Kubeflow Pipelines using the SDK client](https://www.kubeflow.org/docs/components/pipelines/sdk/connect-api/#configure-sdk-client-by-environment-variables).

  Recommend adding the env vars to your .bashrc or .zshrc etc to persist your config.

  Verify your configuration and connectivity:

  ```bash
  kfp experiment list
  ```

  Requirements on the KFP backend installation:

  * Current limitation, this only works for [KFP Standalone](https://www.kubeflow.org/docs/components/pipelines/installation/standalone-deployment/), not tested on full Kubeflow yet.
  * KFP backend version should be at least 1.7.0-rc.2.

Instructions:

* Run everything e2e: build images, backend compiler, compile pipelines and run them:

  ```bash
  make dev
  ```

* Run go unit tests:

  ```bash
  make test
  # or watch file changes and rerun automatically
  make test-watch
  ```

* For individual targets, read the Makefile directly.

Current limitations (welcome contributions to fix them):

* this only works in Linux, because of go compilation mode

### Update licenses

Download the license tool binary from <https://github.com/Bobgy/go-licenses/releases> and put it into $PATH.

Update licenses info by:

```bash
make license-launcher
```

or run the following to enable verbose output:

```bash
GO_LICENSES_FLAGS=-v4 make license-launcher
```

After the update, check generated third_party/licenses/launcher.csv file to
make sure licenses of new dependencies are correctly identified.

If something is unexpected, examine the unexpected dependencies by yourself and add
overrides to [go-licenses.yaml](./go-licenses.yaml).

For detailed documentation about the tool: <https://github.com/Bobgy/go-licenses/tree/main/v2>.
