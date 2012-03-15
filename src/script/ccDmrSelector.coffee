window.ccDmrSelector = class ccDmrSelector
	_create: -> 
		
		SinglePanelBase = ($ '<div/>').addClass(@css.SinglePanelBase)
                                  .append(($ '<div/>').addClass(@css.IconContainer).append($ '<img/>'))
                                  .append(($ '<label/>').addClass(@css.LogoName))
                                  .append(($ '<div/>').html('&#9662;').addClass(@css.SinglePanelArrowBase))
                  
		OptionsContainer = ($ '<div/>').addClass(@css.OptionsContainer)									   
		
		if @options.dmr_list.length == 0		
		
			Empty =  ($ '<div/>').attr(id : "NoElements")
                           .text(@options.EmptyMessage)	
                           .addClass(@css.Erroressage)
		
			OptionsContainer.append(Empty)						
					
		else
			
			OptionsList = ($ '<table/>').attr(cellpadding : "0")
                                  .attr(cellspacing : "0")
                                  .attr(width : "100%")  
										
								  
			OptionsContainer.append(OptionsList)						
		
			for element,i in @options.dmr_list
				tempImg =($ '<td/>').attr(id : @options.dmr_list[i].account_name + "_image" )			
                            .addClass(@css.ElementImage)
                            .append( ($ '<img/>').attr( "src", @options.Icon_Path + @options.dmr_list[i].logo_id + ".png" ))
				
				tempText =($ '<td/>').attr(id : @options.dmr_list[i].account_name + "_text" )			
                             .addClass(@css.ElementText)
                             .append( ($ '<p/>').text( @options.dmr_list[i].account_name ))
				
				tempDiv = ($ '<tr/>').attr(id : "row_" + @options.dmr_list[i].account_name.toUpperCase() )			
                             .attr(title : @options.dmr_list[i].account_name  )			
                             .attr(name : i+1)			
                             .addClass(@css.Row)
                             .addClass("Page"+ Math.ceil((i+1)/@options.PageNationLimit))
                             .append(tempImg)
                             .append(tempText)
                             .attr(style: "display:none")
						
				OptionsList.append(tempDiv)
		
			NoElements = ($ '<div/>').attr(id : "NoElement" )
                               .attr(style: "display:none")
                               .addClass(@css.Erroressage)
                               .text( @options.EmptySearchMessage )
                               
			OptionsList.append(NoElements)
		
			ArrowPrevious = ($ '<div/>').html('&#9664;')
                                .addClass(@css.ArrowPrevious)
			
			ArrowNext = ($ '<div/>').html('&#9654;')
                              .addClass(@css.ArrowNext)
			
			PageIndex = ($ '<input/>').attr(id : "PageIndex")  
                                .attr(type : "text")
                                .attr(style: "width:20px")
                                .val('1')
                    
			TotalPages = ($ '<label/>').text( Math.ceil(i/@options.PageNationLimit) )	
                                 .addClass(@css.Label)
			
			Pagination =($ '<div/>').addClass(@css.Pagination)
                              .append(($ '<label/>').text("Page "))
                              .append(PageIndex)
                              .append(($ '<label/>').text(" of "))
                              .append(TotalPages)
                             
			
			PageContainer = ($ '<div/>').addClass(@css.PageContainer)
                                  .append(ArrowPrevious)
                                  .append(Pagination)
                                  .append(ArrowNext)
                                  .attr(style: "display : none")
                    
			SearchInputBox = ($ '<input/>').attr(type : "text")
                                     .addClass(@css.SearchInputBox)
                                     .addClass(@css.input)										   
			
			SearchIcon =($ '<div/>').addClass(@css.SearchIcon)					 
								 
			SearchBox =	($ '<div/>').addClass(@css.SearchBox)
                              .append(SearchInputBox)
                              .append(SearchIcon)
		 
			if i > @options.PageNationLimit 
				PageContainer.attr(style : "visibility : visible")
				SearchBox.attr(style: "width : 63% ; margin-right :10px")
				
		CancelLink = ($ '<input/>').attr( id: "cancelButton"  ,type : "Submit", value : "Cancel")
                               .addClass(@css.Button)
									 
		ClearLink = ($ '<input/>').attr(id: "clearButton" ,type : "Submit", value : "Clear")
                              .addClass(@css.Button)
		
		ButtonHolder = ($ '<div/>').addClass(@css.ButtonHolder)
                               .append(ClearLink)
                               .append(CancelLink)
                    
		Wrapper = ($ '<div/>').append(SearchBox)
                          .append(PageContainer)
                          .append(OptionsContainer)
                          .append(ButtonHolder)
			
		PopupContainer = ($ '<div/>').addClass(@css.PopupContainer)								  	 
                                 .append(Wrapper)
										
										
		
		Title = ($ '<div/>').text(@options.Title)
                        .addClass(@css.Title)					 
		
		SelectorContainer = ($ '<div/>').attr(style: "display:none")
                                    .addClass(@css.PopupPanelBase)
                                    .append(Title)
                                    .append(PopupContainer)
                      
		($ @element).addClass(@css.SelectorWrapper)
                .attr(id : @options.dns_name)  
                .append(SinglePanelBase)
                .append(SelectorContainer)
					
		($ @element).find(".Page1").attr(style: "display:block")		
		
	_init: ->
		me = this
		element = ($ @element)
		element.find('.' + @css.SinglePanelArrowBase).click (event)  ->
			me.SwitchtoSelector(me.options.Default)
				
		element.find('.' + @css.ArrowNext).click (event)  ->
			if me.PageChange( parseInt( this.parentNode.childNodes[1].childNodes[1].value) ,parseInt(this.parentNode.childNodes[1].childNodes[3].innerHTML), 1) then this.parentNode.childNodes[1].childNodes[1].value++
			
		element.find('.' +@css.ArrowPrevious).click (event) ->
			if me.PageChange(parseInt(this.parentNode.childNodes[1].childNodes[1].value),parseInt(this.parentNode.childNodes[1].childNodes[3].innerHTML), 0) then this.parentNode.childNodes[1].childNodes[1].value--
				
		element.find("#cancelButton").click (event) ->
			me.SwitchtoPanel(me.options.Default , 0)
			
		element.find("#clearButton").click (event) ->
			me.SwitchtoPanel(me.options.Default , 1)
			
		element.find('.' +@css.Row).click (event) ->
			me.options.Default = parseInt(this.attributes[2].value)
			if me.options.Default !=0
				($ me.element).find('.'+me.css.SelectedRow).removeClass(me.css.SelectedRow)
			($ me.element).find('tr[name=' + me.options.Default + ']').addClass(me.css.SelectedRow)
			me.SwitchtoPanel(me.options.Default , 0)
			
		element.find('.' +@css.SearchInputBox).change (event) ->
			me.Search(this.value.toUpperCase())
			this.value=''
			
		element.find('.' +@css.SearchIcon).change (event) ->
			me.Search(this.previousSibling.value.toUpperCase())
			this.value=''
		
		element.find('#PageIndex').change (event) ->
			if me.AlphaNumericValidator(this.value) and parseInt(this.value) <= parseInt(this.nextSibling.nextSibling.innerHTML) and parseInt(this.value) > 0   
				($ me.element).find('tr[id^="row_"]').attr(style: "display:none")
				($ me.element).find(".Page"+ this.value).attr(style: "display:block")
			else 
				this.value = ''
	
	SwitchtoPanel: ( Selected , Cleared ) ->
		if Cleared == 1
			($ @element).find('.'+@css.SelectedRow).removeClass(@css.SelectedRow)
			@options.Default = 0 
			($ @element[0].children[0]).find('img').attr(style: "display:none") 
			($ @element[0].children[0]).find('label').attr(style: "display:none") 
		else if @options.Default != 0 
				($ @element).find('.'+@css.SinglePanelBase).find('img').attr(style: "display:block")
																	   .attr("src", @options.Icon_Path + @options.dmr_list[@options.Default-1].logo_id + ".png" )
				($ @element).find('.'+@css.SinglePanelBase).find('label').attr(style: "display:block") 
																		 .text( @options.dmr_list[@options.Default-1].account_name)
				elementClicked(@options.Default)
		
		($ @element).find('.'+@css.PopupPanelBase).attr(style: "display:none")
		($ @element).find('.'+@css.SinglePanelBase).attr(style: "display:block")
	
	SwitchtoSelector: ( Selected ) ->
		($ @element).find("#NoElement").attr(style: "display:none")	
		($ @element).find('tr[id^="row_"]').attr(style: "display:none")
		($ @element).find(".Page1").attr(style: "display:block")		
		($ @element).find("#PageIndex").val('1')
		($ @element).find('.'+ @css.PopupPanelBase).attr(style: "display:block")
		($ @element).find('.'+ @css.SinglePanelBase).attr(style: "display:none")
	
	Search: (SearchWord) ->
		($ @element).find('tr[id^="row_"]').attr(style: "display:none")
		if ($ @element).find('tr[id^="row_'+SearchWord+'"]').length == 0 then ($ @element).find("#NoElement").attr(style: "display:block")
		else
			($ @element).find("#NoElement").attr(style: "display:none")	
			($ @element).find('tr[id^="row_'+SearchWord+'"]').attr(style: "display:block")
	
	AlphaNumericValidator: (entry) ->
		if isNaN entry then	return 0 else return 1 

	PageChange: (PresentPage,TotalPages, UpDown) ->
		($ @element).find("#NoElement").attr(style: "display:none")	
		if (PresentPage == 1 and UpDown == 0 ) or (PresentPage == TotalPages and UpDown == 1 ) then return false
		else 
			($ @element).find(".Page"+PresentPage).attr(style: "display:none")
			if UpDown == 1 then PresentPage++ else PresentPage-- 
			($ @element).find(".Page"+PresentPage).attr(style: "display:block")
			return true
			
	options:
		dns_name: "Default"
		dmr_list : []
		Icon_Path: "images/Icons/"
		Title: "Select DMR"
		Default: 0
		EmptyMessage: "There are no DMR associations for this content Provider"
		EmptySearchMessage: "No Elements to display"
		PageNationLimit: 10
		
	css:
		SelectorWrapper: 'ccDmrSelector',
		OptionsContainer: 'itempanel',
		Row: 'row',
		Erroressage: 'msg',
		PageContainer: 'pagination-container',
		ArrowPrevious: 'arrow-prev',
		ArrowNext: 'arrow-next',
		Pagination: 'pagination',
		Input: 'Input',
		Button: 'btn',
		ButtonHolder: 'btn-container-right',
		SearchBox: 'searchbox',
		SearchInputBox: 'searchfield',		
		SearchIcon: 'icn-search',		
		PopupContainer: 'whitepanel',
		Title: 'title',
		ElementImage: 'icn-container',
		ElementText: 'icn-name',		
		EmptySearch: 'EmptySearch',
		SinglePanelBase: 'singlepanelbase',
		IconContainer: 'icn-container',
		SinglePanelArrowBase: 'singlepanelarrowbase',
		PopupPanelBase:'popuppanelbase',
		LogoName:'LogoName'
		SelectedRow: 'selectedRow' 

			
$.widget "cc.ccDmrSelector", new ccDmrSelector 


elementClicked = (Elementid) ->
	ccDmrSelector_Clicked(Elementid)

