import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setEntry } from '../features/journal/journalSlice';

export function JournalForm() {
  const [headline, setHeadline] = useState('');
  const [prompt, setPrompt] = useState('');
  const [promptResponse, setPromptResponse] = useState('');
  const [text, setText] = useState('');
  const [showPromptInput, setShowPromptInput] = useState(false);

  const dispatch = useDispatch();

  const onSubmit = (event) => {
    event.preventDefault();

    dispatch(setEntry({ headline, prompt, promptResponse, text }));
    setHeadline('');
    setPrompt('');
    setPromptResponse('');
    setText('');
  };

  const buttonOptions = [
    {
      title: 'Choose a prompt',
      prompts: ['prompt1', 'prompt2', 'prompt3', 'prompt4', 'prompt5'],
    },
    {
      title: 'Write my own prompt',
      prompts: [],
    },
  ];
  // 🐞🐞🐞 TO do: add a choose new/choose used prompt
  // for now, grab 5 at random and add a reshuffle button
  // const aboutData = [
  //   {
  //     title: 'Choose a new prompt',
  //     prompts: ['prompt1', 'prompt2', 'prompt3', 'prompt4', 'prompt5'],
  //   },
  //   {
  //     title: 'Choose a used prompt',
  //     prompts: ['prompt1', 'prompt2', 'prompt3', 'prompt4', 'prompt5'],
  //   },
  //   {
  //     title: 'Write my own prompt',
  //     prompts: ['prompt6', 'prompt7', 'prompt8', 'prompt9', 'prompt10'],
  //   },
  // ];
  const [index, setIndex] = useState(0);

  function PromptPicker() {
    return (
      <div>
        <div>
          <select>
            {buttonOptions[index].prompts.map((prompt, index) => (
              <option key={index}>{prompt}</option>
            ))}
          </select>
        </div>
      </div>

      // <div>
      //   <label>Select a Prompt:</label>
      //   <Select options={buttonOptionsMod[index].prompts} />
      // </div>
    );
  }

  // Choose Prompt Buttons
  function ToggleButtons() {
    return (
      <div>
        {buttonOptions.map((item, itemIndex) => {
          // console.log('🚀 ~ itemIndex:', itemIndex);
          // console.log('🚀 ~ item:', item);
          return (
            <button
              key={itemIndex}
              onClick={() => setIndex(itemIndex)}
            >
              {item.title}
            </button>
          );
        })}
      </div>
    );
  }
  // Choose Prompt Buttons
  // function ToggleButtons() {
  //   return (
  //     <div>
  //       {aboutData.map((item, itemIndex) => {
  //         // console.log('🚀 ~ itemIndex:', itemIndex);
  //         // console.log('🚀 ~ item:', item);
  //         return (
  //           <button
  //             key={itemIndex}
  //             onClick={() => setIndex(itemIndex)}
  //           >
  //             {item.title}
  //           </button>
  //         );
  //       })}
  //     </div>
  //   );
  // }
  // PromptChoice
  //🐞🐞🐞🐞🐞🐞🐞🐞🐞🐞🐞🐞🐞🐞🐞🐞🐞🐞🐞🐞🐞🐞🐞🐞🐞🐞🐞🐞🐞🐞🐞🐞🐞🐞🐞🐞🐞 THIS COULD BE BETTER HANDLED BY A SETPROMPT FUNCTION DUDE
  function SelectedPromptOption() {
    // console.log('🚀 ~ buttonOptions[index];:', buttonOptions[index]);
    // buttonOptions[index]??prompts ?
    // console.log(
    //   '🚀 ~ buttonOptions[index]??prompts:',
    //   buttonOptions[index]?.prompts.length
    // );
    if (buttonOptions[index]?.prompts.length) {
      // return PromptPicker();
      return <PromptPicker />;
    } else {
      let onClickFunction = () => setShowPromptInput(true);
      return (
        <div className='form-group'>
          <label htmlFor='prompt'>prompt</label>
          <input
            type='prompt'
            name='prompt'
            id='prompt'
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
          />
        </div>
        // <div>
        //   {buttonOptions[index].prompts.map((item, itemIndex) => {
        //     // console.log('🚀 ~ itemIndex:', itemIndex);
        //     // console.log('🚀 ~ item:', item);
        //     return (
        //       <div key={itemIndex}>
        //         <p>{item}</p>
        //       </div>
        //     );
        //   })}
        // </div>
      );
    }
  }

  // function SelectedPromptOption() {
  //   return (
  //     <div>
  //       {aboutData[index].prompts.map((item, itemIndex) => {
  //         console.log('🚀 ~ itemIndex:', itemIndex);
  //         console.log('🚀 ~ item:', item);
  //         return (
  //           <div key={itemIndex}>
  //             <p>{item}</p>
  //           </div>
  //         );
  //       })}
  //     </div>
  //   );
  // }
  return (
    <section className='form'>
      <ToggleButtons />
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <SelectedPromptOption />
          <label htmlFor='headline'>headline</label>
          <input
            type='headline'
            name='headline'
            id='headline'
            value={headline}
            onChange={(event) => setHeadline(event.target.value)}
          />
        </div>
        {/* <div className='form-group'>
              <label htmlFor='prompt'>prompt</label>
              <input
                type='prompt'
                name='prompt'
                id='prompt'
                value={prompt}
                onChange={(event) => setPrompt(event.target.value)}
              />
            </div> */}
        <div className='form-group'>
          <label htmlFor='promptResponse'>promptResponse</label>
          <input
            type='promptResponse'
            name='promptResponse'
            id='promptResponse'
            value={promptResponse}
            onChange={(event) => setPromptResponse(event.target.value)}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='text'>Entry</label>
          <input
            type='text'
            name='text'
            id='text'
            value={text}
            onChange={(event) => setText(event.target.value)}
          />
        </div>
        <div className='form-group'>
          <button
            className='btn btn-block'
            type='submit'
          >
            Add Entry
          </button>
        </div>
      </form>
    </section>
  );
}
