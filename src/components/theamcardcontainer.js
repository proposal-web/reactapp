import React from 'react';

const ThemeCardsContainer = () => {
  const themes = [
    {
      title: 'Social Impact',
      description:
        'Showcase projects addressing critical social issues. Focusing on community betterment, inclusivity, health access, education access or solving local/national humanitarian challenges that make a meaningful impact for overall quality of life or societal welfare.',
    },
    {
      title: 'Economic Impact',
      description:
        'Showcase innovations that boost the financial economy and foster sustainability with emphasis on generating value through the creation of novel solutions in manufacturing or automation. Focus on technological growth, trade, market enhancements, and creation of revenue generation using innovation in areas like AI-based tools/digital tools.',
    },
    {
      title: 'Environmental Impact',
      description:
        'Focus on innovations for the long-term preservation of our environment that focuses on creating cleaner systems, better sustainable resources and protection of the natural environment that leads to a safer world, with long-term preservation strategies. Show projects related to alternative resources that focus on zero waste/emission principles.',
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto p-4"> {/* Main container */}
      <div className="mb-4 text-center">
        <h2 className="text-2xl font-bold uppercase text-gray-700">Themes for Project</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"> {/* Grid layout */}
        {themes.map((theme, index) => (
          <div
            key={index}
            className="w-full p-4 bg-gray-100 rounded-lg border shadow-md transition duration-300 hover:shadow-xl transform hover:-translate-y-1"
          >
            <div className="flex flex-col items-center p-2">
              <h3 className="text-xl font-bold text-gray-800 uppercase text-center mb-2">{theme.title}</h3>
              <p className="font-medium text-center text-gray-700">{theme.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThemeCardsContainer;
