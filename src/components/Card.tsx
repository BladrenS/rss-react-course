import { Component } from 'react';

interface Props {
  name: string;
  description: string;
  image: string;
}

export default class Card extends Component<Props> {
  render() {
    const { name, description, image } = this.props;

    return (
      <div className="border rounded p-4 bg-white shadow flex items-center space-x-4">
        <img src={image} alt={name} className="w-16 h-16 object-contain" />
        <div>
          <h2 className="text-lg font-bold capitalize">{name}</h2>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
    );
  }
}
