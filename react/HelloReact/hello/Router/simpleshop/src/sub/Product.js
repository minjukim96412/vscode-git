
export default function Product(props) {
  return (
    <div className="product">
      <img src={props.pimg} alt={props.ptitle} />
      <h2>{props.ptitle}</h2>
      <p>{props.pcontent}</p>
      <p>{props.pprice}원</p>
    </div>
  );
}