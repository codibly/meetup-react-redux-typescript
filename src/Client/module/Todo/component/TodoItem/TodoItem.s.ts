import glamorous from 'glamorous';

type ItemWrapperProps = {
  isDone?: boolean
};

export const StyledItem = glamorous.li(
  {
    transition: 'background .2s',
    cursor: 'pointer',
    listStyleType: 'none',
    userSelect: 'none',
    padding: '.5rem 0',
    '&:hover': {
      background: '#fafafa'
    }
  },
  (props: ItemWrapperProps) => ({
    textDecoration: props.isDone ? 'line-through' : 'none',
    color: props.isDone ? '#aaa' : 'initial'
  })
);

export const StyledCheckbox = glamorous.input({
  marginRight: 5
});
