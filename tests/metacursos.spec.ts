import { test, expect } from '@playwright/test';

test('Adicionar Meta de Curso - Teste de Validação', async ({ request }) => {
    const baseUrl = 'https://4-bio-processo-seletivo-lara.wiremockapi.cloud';

    const token = 'tokenAuth';
    const dadosParaEnviar = {
        Id: -1,
        DepId: 1,
        MetaId: 1,
        AnoVigente: 2024,
        MetaAnual: true,
        MetaSemestral: true,
        DataLimitePreenchimento: '2024-09-30T23:59:59'
    };

    const response = await request.post(`${baseUrl}/metacursos`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        data: dadosParaEnviar
    });

    const body = await response.json();

    const listaDeErros = body.listaDeErros;
    const mensagemDeErro = listaDeErros[0].Mensagem;

    expect(mensagemDeErro).toBe('O campo Id requer um valor maior que 0.');
});
