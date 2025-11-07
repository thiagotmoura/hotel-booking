# Contribuindo para Hotel Booking

Obrigado por considerar contribuir para este projeto! 🎉

## 📋 Como Contribuir

### Reportando Bugs

1. Verifique se o bug já não foi reportado nas [Issues](../../issues)
2. Use o template de Bug Report
3. Inclua o máximo de detalhes possível
4. Adicione screenshots se aplicável

### Sugerindo Funcionalidades

1. Verifique se a funcionalidade já não foi sugerida
2. Use o template de Feature Request
3. Descreva o caso de uso claramente
4. Explique por que é importante

### Pull Requests

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

#### Convenções de Commit

Usamos [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` Nova funcionalidade
- `fix:` Correção de bug
- `docs:` Mudanças na documentação
- `style:` Formatação, ponto e vírgula, etc
- `refactor:` Refatoração de código
- `test:` Adição ou correção de testes
- `chore:` Atualizações de build, configs, etc

#### Checklist do PR

- [ ] Código segue o style guide do projeto
- [ ] Testes foram adicionados/atualizados
- [ ] Documentação foi atualizada
- [ ] Todos os testes estão passando
- [ ] Sem conflitos com a branch main
- [ ] Build está funcionando

## 🧪 Executando Testes

```bash
# Instalar dependências
yarn install

# Executar testes
yarn test

# Executar testes em modo watch
yarn test:watch

# Type check
yarn typecheck
```

## 📝 Padrões de Código

### Vue/Nuxt

- Use Composition API
- Componentes devem ser SFC (Single File Components)
- Use TypeScript para tipagem
- Siga o padrão de nomenclatura: PascalCase para componentes

### CSS/Tailwind

- Prefira classes utilitárias do Tailwind
- Use `@apply` apenas para componentes reutilizáveis
- Siga o padrão mobile-first

### TypeScript

- Sempre tipifique props, emits, e retornos de função
- Use interfaces para tipos complexos
- Evite `any`, prefira `unknown` quando necessário

## 📚 Recursos

- [Documentação do Projeto](../README.md)
- [Arquitetura](../docs/ARCHITECTURE.md)
- [Guia de Desenvolvimento](../docs/DEVELOPMENT.md)
- [Design Patterns](../docs/DESIGN_PATTERNS.md)

## ❓ Dúvidas?

Abra uma [Discussion](../../discussions) ou entre em contato com os mantenedores.

## 📄 Licença

Ao contribuir, você concorda que suas contribuições serão licenciadas sob a mesma licença do projeto.
