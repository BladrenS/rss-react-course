import React, { Component } from 'react';

interface Props {
  onSearch: (term: string) => void;
}

interface State {
  inputValue: string;
  showDropdown: boolean;
  storedTerm: string;
}

export class Search extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const stored = localStorage.getItem('searchTerm') || '';
    this.state = {
      inputValue: stored,
      showDropdown: false,
      storedTerm: stored,
    };
  }

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ inputValue: e.target.value });
  };

  handleSearchClick = () => {
    const trimmed = this.state.inputValue.trim();
    this.props.onSearch(trimmed);

    if (trimmed) {
      localStorage.setItem('searchTerm', trimmed);
      this.setState({ storedTerm: trimmed });
    }

    this.setState({ showDropdown: false });
  };

  handleFocus = () => {
    if (this.state.storedTerm) {
      this.setState({ showDropdown: true });
    }
  };

  handleBlur = () => {
    setTimeout(() => {
      this.setState({ showDropdown: false });
    }, 100);
  };

  handleSelectStored = () => {
    this.setState({ inputValue: this.state.storedTerm, showDropdown: false });
  };

  render() {
    const { inputValue, showDropdown, storedTerm } = this.state;

    return (
      <div className="relative w-full max-w-xl mx-auto mb-8 mt-6">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputValue}
            onChange={this.handleInputChange}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            placeholder="Search Pokémon"
            className="w-full px-4 py-2 border rounded shadow"
          />
          <button
            onClick={this.handleSearchClick}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Search
          </button>
        </div>

        {showDropdown && storedTerm && (
          <div
            className="absolute top-full left-0 w-[489px] bg-white border border-t-0 rounded-b shadow z-10 cursor-pointer"
            onMouseDown={this.handleSelectStored}
          >
            <div className="px-4 py-2 hover:bg-gray-100">{storedTerm}</div>
          </div>
        )}
      </div>
    );
  }
}
