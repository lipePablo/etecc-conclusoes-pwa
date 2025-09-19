Guia de Liberação de Versões

Atualização de versão da aplicação (manual):

1) Atualize os campos de versão na UI
   - index.html: `#loadingVersion` (tela de inicialização)
   - index.html: `#currentVersion` (menu lateral)
   - index.html: variável `currentAppVersion`

2) (Opcional) Se houver versionamento externo
   - Atualize version.json (se o projeto usar) e o changelog conforme a política da equipe.

3) Commits e push
   - Ao concluir qualquer alteração funcional no sistema, incremente a versão (semver) e faça `git commit` com mensagem clara e `git push`.
   - Garanta que a versão exibida na aplicação seja a mesma publicada no repositório.

Política sugerida (SemVer)
   - MAJOR: mudanças incompatíveis
   - MINOR: novas funcionalidades compatíveis
   - PATCH: correções e ajustes

