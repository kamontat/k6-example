## Topics

1. Why K6?
  - Load testing but Coding
2. How to install?
  - Luckily, I create asdf plugin `:)`
  - Add plugin via `asdf plugin add "k6" "https://github.com/kc-workspace/asdf-k6.git"`
  - Install via `asdf install k6 latest`
  - Apply via `asdf global k6 latest`
3. How to start?
  - Create starter file by: `k6 new tests/example.js`
  - Run file by: `k6 run tests/example.js`
4. Output?
  - To visualize data from our Grafana, use below command

```shell
export K6_PROMETHEUS_RW_SERVER_URL=https://prometheus-sumato.cognius.net/api/v1/write
k6 run -o experimental-prometheus-rw tests/example.js
```

## Interesting topics

- When run large load tests, you might need to fine-tuning your machine ([link][fine-tune-machine])
- You can distributes your tests across multiple machine in Kubernetes ([link][distribute-tests])

<!-- LINKS -->

[fine-tune-machine]: https://grafana.com/docs/k6/latest/set-up/fine-tune-os/
[distribute-tests]: https://grafana.com/blog/2022/06/23/running-distributed-load-tests-on-kubernetes/