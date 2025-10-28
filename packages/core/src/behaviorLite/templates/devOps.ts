import type { Paths } from '../paths.js';

export function devOpsTemplate(userText: string, p: Paths){
  const tf = p.devops?.tfDir ?? 'infra/terraform';
  const k8s = p.devops?.k8sDir ?? 'infra/k8s';
  const ci = p.devops?.ciDir ?? '.github/workflows';
  return {
    role: 'DevOps/SRE Engineer.',
    goal: 'Create IaC + deployment manifests + CI checks for a simple service.',
    constraints: [
      'Idempotent, minimal modules/manifests; no secrets committed.',
      'Validation steps: terraform fmt/validate, kubectl/helm lint (if available).',
      'Small diffs with explicit paths.'
    ],
    plan: [
      `Terraform skeleton: ${tf}/main.tf (+ variables.tf, outputs.tf)`,
      `K8s manifests: ${k8s}/deployment.yaml + ${k8s}/service.yaml`,
      `CI: ${ci}/ci.yml with lint/validate jobs`
    ],
    reactHooks: ['If cluster/creds unknown, mark TODO and use dry-run validators only.'],
    checks: ['terraform fmt/validate ok', 'k8s lint ok', 'CI config parses'],
    deliverables: [
      `${tf}/main.tf`,
      `${k8s}/deployment.yaml`,
      `${k8s}/service.yaml`,
      `${ci}/ci.yml`
    ],
    cursorCommand:
`Create DevOps skeleton:
- Terraform: ${tf}/main.tf (+ vars/outputs)
- K8s: ${k8s}/deployment.yaml + service.yaml
- CI: ${ci}/ci.yml
Run terraform validate / lint steps as applicable and show outputs.`
  };
}

