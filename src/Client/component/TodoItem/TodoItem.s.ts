
import glamorous from 'glamorous';
import * as colors from 'material-colors';

type ItemWrapperProps = {
  done: boolean;
};

export const ItemWrapper = glamorous.li(
  {
    padding: 10,
    marginBottom: 1,
    color: colors.blueGrey['900'],
    transition: 'background .2s',
    cursor: 'pointer'
  },
  (props: ItemWrapperProps) => ({
    background: props.done ? colors.blueGrey['100'] : colors.blueGrey['50'],
    textDecoration: props.done ? 'line-through' : 'none'
  })
);

export const ItemContent = glamorous.span({
  paddingLeft: 10
});
