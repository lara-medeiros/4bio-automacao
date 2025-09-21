import { test, expect } from '@playwright/test';

test('Adicionar Meta de Curso - Teste de Validação', async ({ request }) => {
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

    const timestampAntesDaRequest = Date.now()
    const response = await request.post('/metacursos', {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        data: dadosParaEnviar
    });
    const timestampDepoisDaRequest = Date.now()
    const tempoDeDuracao = timestampDepoisDaRequest - timestampAntesDaRequest;
   
    expect(response.status(), `body: ${await response.text()}`).toBe(400);

    // A API mockada (WireMock) não retorna 'Content-Type: application/json' corretamente,
    // mas isso deve ser validado na API real para garantir que a resposta seja parseável como JSON.
    // expect(response.headers()['content-type']).toContain('application/json');

    const body = await response.json();

    expect(body).toHaveProperty('listaDeErros');
    expect(Array.isArray(body.listaDeErros)).toBe(true);
    expect(body.listaDeErros.length).toBe(1);

    expect(body.listaDeErros[0]).toHaveProperty('Mensagem');
    expect(body.listaDeErros[0].Mensagem).toBe('O campo Id requer um valor maior que 0.');
    
    expect(tempoDeDuracao).toBeLessThan(1000);
});
