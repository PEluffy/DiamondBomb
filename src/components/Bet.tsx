interface betProp {
  bet: {
    money: string;
    moneyKey: string;
  };
}

export default function Bet({ bet }: betProp) {
  return <option value={bet.moneyKey}>{bet.money}</option>;
}
