import { Portal } from "react-portal";
import {
  Container,
  ItemRow,
  ItemImage,
  ItemName,
  Attribute,
  FixedInfo,
  SkillIcon,
  PlusButton
} from "./styles";
import Tooltip from "-/src/components/Tooltip";
import {
  SkillTooltip,
  AttributeTooltip,
  ItemTooltip
} from "-/src/components/tooltips";

const ItemCard = ({ item }) => {
  const { skills, main_attribute_value, main_attribute } = item;
  return (
    <>
      <Portal>
        <Tooltip
          id={`item:${item.id}`}
          multline
          place="top"
          effect="solid"
          getContent={() => <ItemTooltip item={item} />}
        />
      </Portal>
      <ItemRow data-for={`item:${item.id}`} data-tip>
        <ItemImage src={item.icon ? item.icon.url : "/images/item.svg"} />
        <ItemName>{item.name}</ItemName>
        <FixedInfo>
          {skills.length > 0 &&
            skills.map((skill, index) => (
              <>
                <SkillIcon
                  data-for="skill"
                  data-tip={skill.id}
                  src={skill.icon ? skill.icon.url : "/images/skill.svg"}
                />
                {index === 0 && (
                  <Portal>
                    <Tooltip
                      id="skill"
                      multline
                      place="top"
                      effect="solid"
                      getContent={dataTip => (
                        <SkillTooltip
                          skill={skills.find(e => e.id === Number(dataTip))}
                        />
                      )}
                    />
                  </Portal>
                )}
              </>
            ))}
          <Attribute
            data-for={`attribute${item.id}`}
            data-tip
            instance={main_attribute}
          />
          <Portal>
            <Tooltip
              id={`attribute${item.id}`}
              multline
              place="top"
              effect="solid"
              getContent={() => (
                <AttributeTooltip
                  value={main_attribute_value}
                  type={main_attribute}
                />
              )}
            />
          </Portal>
        </FixedInfo>
      </ItemRow>
    </>
  );
};

export default ItemCard;
