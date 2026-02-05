# Aurora: When RL Meets Adaptive Speculative Training

> **A Unified Training-Serving System for LLM Inference Acceleration**

[![Website](https://img.shields.io/badge/Website-aurora--spec.github.io-blue)](https://aurora-spec.github.io)
[![Paper](https://img.shields.io/badge/Paper-PDF-red)](https://aurora-spec.github.io/static/pdfs/paper.pdf)
[![Code](https://img.shields.io/badge/Code-GitHub-green)](https://github.com/aurora-spec/aurora)

## Overview

Aurora is a unified training-serving system that closes the loop between speculative decoding training and deployment. By continuously learning from live inference traces, Aurora eliminates training-serving mismatch and enables day-0 deployment without offline pretraining.

## Key Features

- **Day-0 Support**: Deploy and adapt from scratch without offline pretraining
- **1.57× Speedup**: On MiniMax M2.1 in mixed-data scenarios
- **1.25× Speedup**: Over static speculators on Qwen3/Llama3
- **Unified Loop**: Online learning from live traffic reduces distribution shift
- **Cost Efficient**: Optimized serving footprint through continuous adaptation
- **Open Source**: Built on SGLang with full implementation available

## Architecture

Aurora features a decoupled design with two components:

- **Inference Server**: SGLang-based speculative decoding engine streaming accepted/rejected tokens to a distributed buffer
- **Training Server**: Asynchronously learns from live serving data and hot-swaps improved weights without service interruption

## Performance

- **Qwen3-Coder-Next-FP8**: 1.21× throughput improvement from scratch
- **MiniMax M2.1**: 1.45× throughput gain over baseline
- **Domain Shift**: Recovers performance within ~10k requests after distribution changes

## Citation

```bibtex
@article{aurora2026,
  title={When RL Meets Adaptive Speculative Training: A Unified Training-Serving System},
  author={Wang, Junxiong and Bie, Fengxiang and Li, Jisen and Zhou, Zhongzhu and Shao, Zelei and Wang, Yubo and Liu, Yinghui and Wu, Qingyang and May, Avner and Yanamandra, Sri and Zhang, Yineng and Song, Shuaiwen and Zhang, Ce and Dao, Tri and Liang, Percy and Athiwaratkun, Ben and Xu, Chenfeng and Wu, Xiaoxia},
  journal={arXiv preprint arXiv:XXXX.XXXXX},
  year={2026},
  url={https://aurora-spec.github.io}
}
```

## Team

Together AI

## License

Creative Commons Attribution-ShareAlike 4.0 International License
