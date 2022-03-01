import { List, ListItem, Typography } from 'practical-react-components-core'

export const meta = {
  name: 'List',
  route: '/components/List',
  menu: '',
}

const CONTROLLER_LIST = [
  { id: 'bla1', description: '192.168.0.100:8080' },
  { id: 'bla2', description: '192.168.0.100:8081' },
]

const Test = () => (
  <List data-cy="list">
    {CONTROLLER_LIST.map(controller => (
      <ListItem key={controller.id} data-cy={`list-item-${controller.id}`}>
        <Typography>{controller.description}</Typography>
      </ListItem>
    ))}
  </List>
)

// eslint-disable-next-line import/no-default-export
export default Test
