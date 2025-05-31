import Editor from '@monaco-editor/react';

const CustomCSSEditor = ({ value, onChangeValue}) => {
    return (
        <div className="gslider-custom-css-editor-wrapper" style={{ height: '250px' }}>
            <Editor
                height="100%"
                defaultLanguage="css"
                value={value}
                onChange={(value) => onChangeValue(value)}
                options={{
                    automaticLayout: true,
                    minimap: { enabled: false },
                    padding: { top: 10, bottom: 10 },
                    lineNumbers: 'on',
                    lineNumbersMinChars: 2,
                    quickSuggestions: true,
                }}
            />
        </div>
    );
};

export default CustomCSSEditor;

