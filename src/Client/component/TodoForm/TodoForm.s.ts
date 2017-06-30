
import glamorous from 'glamorous';
import * as colors from 'material-colors';

export const AddInput = glamorous.input(
  {
    padding: 10,
    marginBottom: 1,
    color: colors.blueGrey['900'],
    width: '100%',
    border: `2px solid ${ colors.blueGrey['500'] }`
  }
);
