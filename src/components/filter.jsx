import { useEffect, useState } from "react";
import { IoIosFunnel } from "react-icons/io";


const Filter = ({ placeHolder, options, setDonations, items = [], onChangeOption, value }) => {
  const [showMenu,setShowMenu]=useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
    
    useEffect(()=>{
        const handler = ()=>setShowMenu(false)
        window.addEventListener("click",handler)
        return ()=>{window.removeEventListener("click",handler)}
    })

    // keep internal selectedValue in sync when parent provides a value prop
    useEffect(() => {
      if (value === undefined || value === null) return;
      const valStr = (value || '').toString().toLowerCase();
      const found = (options || []).find((o) => ((o.value || o.label) || '').toString().toLowerCase() === valStr);
      if (found) {
        setSelectedValue(found);
      } else if (valStr === 'all') {
        const allOpt = (options || []).find((o) => (o.value || '').toString().toLowerCase() === 'all');
        setSelectedValue(allOpt || null);
      } else {
        setSelectedValue(null);
      }
    }, [value, options]);

    const handleInputClick = (e)=>{
        e.stopPropagation()
        setShowMenu(!showMenu)
    }


    const getDisplay = () => {
        if(selectedValue){
            return selectedValue.label
        }
      return placeHolder;
    };

    const onItemClick = (option)=>{
        setSelectedValue(option);
        // notify parent of selected option if handler provided
        if(onChangeOption) onChangeOption(option);
        // filter locally from provided items by status if setDonations provided
        if(!items || items.length < 1){
          if(setDonations) setDonations([]);
          return;
        }
        const val = (option.value || option.label || "").toString().toLowerCase();
        if(val === "all" || val.includes("all")){
          if(setDonations) setDonations(items);
          return;
        }
        const filtered = items.filter((it) => {
          const status = (it.status || "").toString().toLowerCase();
          return status === val;
        });
        if(setDonations) setDonations(filtered);
    }

    const isSelected = (option)=>{
        if(!selectedValue){
            return false;
        }
        return selectedValue.value===option.value;
    }

    
  
    return (
      <div className="Filter-container">
        <div onClick={handleInputClick} className="Filter-input">
          <div className="Filter-selected-value">{getDisplay()}</div>
          <div className="Filter-tools">
            <div className="Filter-tool">
            <IoIosFunnel/>
            </div>
          </div>
        </div>
        {showMenu&&(<div className="Filter-menu" >
            {options.map((option)=>(<div onClick={()=>onItemClick(option)} key={option.value} className={`dropdown-item ${isSelected(option) && "selected"}`}>
                {option.label}
            </div>))}
           </div> )  }
      </div>
    );
  };
  
  export default Filter;