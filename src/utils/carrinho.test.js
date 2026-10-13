import test from 'node:test'
import assert from 'node:assert/strict'

import { calcularTotal } from './carrinho.js'

test('calcularTotal converte valores em texto para número', () => {
    const total = calcularTotal([
        { price: '129,90' },
        { price: '89,90' },
    ])

    assert.equal(total, 219.8)
})

test('calcularTotal ignora preços inválidos ou ausentes', () => {
    const total = calcularTotal([
        { price: '79,90' },
        { price: null },
        { price: undefined },
        { price: 'R$ 44,90' },
    ])

    assert.equal(total, 124.8)
})
