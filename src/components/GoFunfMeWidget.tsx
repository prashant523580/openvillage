// components/GoFundMeWidget.tsx
const GoFundMeWidget = () => {
    return (
      <div className="w-full h-auto">
        <iframe
          src="https://www.gofundme.com/f/YOUR-CAMPAIGN-ID/widget/large"
          width="100%"
          height="600"
          frameBorder="0"
          scrolling="no"
          title="GoFundMe"
        ></iframe>
      </div>
    );
  };
  
  export default GoFundMeWidget;
  