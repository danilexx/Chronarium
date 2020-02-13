import { Message, Attribute } from "./styles";

const AttributeTooltip = ({ value, type }) => {
  return (
    <>
      <Message>
        You need {value} <Attribute attribute={type}>{type}</Attribute> to equip
        this item
      </Message>
    </>
  );
};
export default AttributeTooltip;
