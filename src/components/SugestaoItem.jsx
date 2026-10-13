import { formatarPreco } from '../utils/formatarPreco'
import ProdutoCard from './ProdutoCard'

export default function SugestaoItem({ produto, onAdicionar }) {
  // Renderiza exatamente o ProdutoCard para garantir consistência visual
  return <ProdutoCard produto={produto} onAdicionar={onAdicionar} />
}
export default function SugestaoItem({ produto, onAdicionar }) {
  return (
    <div className="sugestao">
      <div className="sugestao-imagem-moldura">
        <img src={produto.image} alt={produto.title} className="sugestao-imagem" />
      </div>
      <div className="sugestao-info">
        <p className="sugestao-titulo">{produto.title}</p>
        <p className="preco preco-pequeno">{formatarPreco(produto.price)}</p>
      </div>
      <button className="botao botao-pequeno" onClick={() => onAdicionar(produto)}>
        Comprar
      </button>
    </div>
  )
}
