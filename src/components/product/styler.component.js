import tw from 'twin.macro';
import styled from 'styled-components';
import Select from 'react-select';

export const Styler = styled(Select)(() => [
    `
  .Select_m {
    ${tw`bg-gray-800`}
  }
  .Select__menu {
    ${tw`text-blue-600 bg-gray-100`}
  }
`,
  ]);