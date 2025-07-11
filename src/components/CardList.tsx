import { Component } from 'react';
import Card from './Card';

interface Props {
  items: Array<{ name: string; description: string; image: string }>;
}

export default class CardList extends Component<Props> {
  render() {
    const { items } = this.props;

    return (
      <div className="grid gap-4">
        {items.map((item) => (
          <Card
            key={item.name}
            name={item.name}
            description={item.description}
            image={item.image}
          />
        ))}
      </div>
    );
  }
}
