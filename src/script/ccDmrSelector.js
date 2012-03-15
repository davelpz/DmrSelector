(function () {
    var ccDmrSelector, elementClicked;

window.ccDmrSelector = ccDmrSelector = (function() {

  function ccDmrSelector() {}

  ccDmrSelector.prototype._create = function() {
    var ArrowNext, ArrowPrevious, ButtonHolder, CancelLink, ClearLink, Empty, NoElements, OptionsContainer, OptionsList, PageContainer, PageIndex, Pagination, PopupContainer, SearchBox, SearchIcon, SearchInputBox, SelectorContainer, SinglePanelBase, Title, TotalPages, Wrapper, element, i, tempDiv, tempImg, tempText, _len, _ref;
    SinglePanelBase = ($('<div/>')).addClass(this.css.SinglePanelBase).append(($('<div/>')).addClass(this.css.IconContainer).append($('<img/>'))).append(($('<label/>')).addClass(this.css.LogoName)).append(($('<div/>')).html('&#9662;').addClass(this.css.SinglePanelArrowBase));
    OptionsContainer = ($('<div/>')).addClass(this.css.OptionsContainer);
    if (this.options.dmr_list.length === 0) {
      Empty = ($('<div/>')).attr({
        id: "NoElements"
      }).text(this.options.EmptyMessage).addClass(this.css.Erroressage);
      OptionsContainer.append(Empty);
    } else {
      OptionsList = ($('<table/>')).attr({
        cellpadding: "0"
      }).attr({
        cellspacing: "0"
      }).attr({
        width: "100%"
      });
      OptionsContainer.append(OptionsList);
      _ref = this.options.dmr_list;
      for (i = 0, _len = _ref.length; i < _len; i++) {
        element = _ref[i];
        tempImg = ($('<td/>')).attr({
          id: this.options.dmr_list[i].account_name + "_image"
        }).addClass(this.css.ElementImage).append(($('<img/>')).attr("src", this.options.Icon_Path + this.options.dmr_list[i].logo_id + ".png"));
        tempText = ($('<td/>')).attr({
          id: this.options.dmr_list[i].account_name + "_text"
        }).addClass(this.css.ElementText).append(($('<p/>')).text(this.options.dmr_list[i].account_name));
        tempDiv = ($('<tr/>')).attr({
          id: "row_" + this.options.dmr_list[i].account_name.toUpperCase()
        }).attr({
          title: this.options.dmr_list[i].account_name
        }).attr({
          name: i + 1
        }).addClass(this.css.Row).addClass("Page" + Math.ceil((i + 1) / this.options.PageNationLimit)).append(tempImg).append(tempText).attr({
          style: "display:none"
        });
        OptionsList.append(tempDiv);
      }
      NoElements = ($('<div/>')).attr({
        id: "NoElement"
      }).attr({
        style: "display:none"
      }).addClass(this.css.Erroressage).text(this.options.EmptySearchMessage);
      OptionsList.append(NoElements);
      ArrowPrevious = ($('<div/>')).html('&#9664;').addClass(this.css.ArrowPrevious);
      ArrowNext = ($('<div/>')).html('&#9654;').addClass(this.css.ArrowNext);
      PageIndex = ($('<input/>')).attr({
        id: "PageIndex"
      }).attr({
        type: "text"
      }).attr({
        style: "width:20px"
      }).val('1');
      TotalPages = ($('<label/>')).text(Math.ceil(i / this.options.PageNationLimit)).addClass(this.css.Label);
      Pagination = ($('<div/>')).addClass(this.css.Pagination).append(($('<label/>')).text("Page ")).append(PageIndex).append(($('<label/>')).text(" of ")).append(TotalPages);
      PageContainer = ($('<div/>')).addClass(this.css.PageContainer).append(ArrowPrevious).append(Pagination).append(ArrowNext).attr({
        style: "display : none"
      });
      SearchInputBox = ($('<input/>')).attr({
        type: "text"
      }).addClass(this.css.SearchInputBox).addClass(this.css.input);
      SearchIcon = ($('<div/>')).addClass(this.css.SearchIcon);
      SearchBox = ($('<div/>')).addClass(this.css.SearchBox).append(SearchInputBox).append(SearchIcon);
      if (i > this.options.PageNationLimit) {
        PageContainer.attr({
          style: "visibility : visible"
        });
        SearchBox.attr({
          style: "width : 63% ; margin-right :10px"
        });
      }
    }
    CancelLink = ($('<input/>')).attr({
      id: "cancelButton",
      type: "Submit",
      value: "Cancel"
    }).addClass(this.css.Button);
    ClearLink = ($('<input/>')).attr({
      id: "clearButton",
      type: "Submit",
      value: "Clear"
    }).addClass(this.css.Button);
    ButtonHolder = ($('<div/>')).addClass(this.css.ButtonHolder).append(ClearLink).append(CancelLink);
    Wrapper = ($('<div/>')).append(SearchBox).append(PageContainer).append(OptionsContainer).append(ButtonHolder);
    PopupContainer = ($('<div/>')).addClass(this.css.PopupContainer).append(Wrapper);
    Title = ($('<div/>')).text(this.options.Title).addClass(this.css.Title);
    SelectorContainer = ($('<div/>')).attr({
      style: "display:none"
    }).addClass(this.css.PopupPanelBase).append(Title).append(PopupContainer);
    ($(this.element)).addClass(this.css.SelectorWrapper).attr({
      id: this.options.dns_name
    }).append(SinglePanelBase).append(SelectorContainer);
    return ($(this.element)).find(".Page1").attr({
      style: "display:block"
    });
  };

  ccDmrSelector.prototype._init = function() {
    var element, me;
    me = this;
    element = $(this.element);
    element.find('.' + this.css.SinglePanelArrowBase).click(function(event) {
      return me.SwitchtoSelector(me.options.Default);
    });
    element.find('.' + this.css.ArrowNext).click(function(event) {
      if (me.PageChange(parseInt(this.parentNode.childNodes[1].childNodes[1].value), parseInt(this.parentNode.childNodes[1].childNodes[3].innerHTML), 1)) {
        return this.parentNode.childNodes[1].childNodes[1].value++;
      }
    });
    element.find('.' + this.css.ArrowPrevious).click(function(event) {
      if (me.PageChange(parseInt(this.parentNode.childNodes[1].childNodes[1].value), parseInt(this.parentNode.childNodes[1].childNodes[3].innerHTML), 0)) {
        return this.parentNode.childNodes[1].childNodes[1].value--;
      }
    });
    element.find("#cancelButton").click(function(event) {
      return me.SwitchtoPanel(me.options.Default, 0);
    });
    element.find("#clearButton").click(function(event) {
      return me.SwitchtoPanel(me.options.Default, 1);
    });
    element.find('.' + this.css.Row).click(function(event) {
      me.options.Default = parseInt(this.attributes[2].value);
      if (me.options.Default !== 0) {
        ($(me.element)).find('.' + me.css.SelectedRow).removeClass(me.css.SelectedRow);
      }
      ($(me.element)).find('tr[name=' + me.options.Default + ']').addClass(me.css.SelectedRow);
      return me.SwitchtoPanel(me.options.Default, 0);
    });
    element.find('.' + this.css.SearchInputBox).change(function(event) {
      me.Search(this.value.toUpperCase());
      return this.value = '';
    });
    element.find('.' + this.css.SearchIcon).change(function(event) {
      me.Search(this.previousSibling.value.toUpperCase());
      return this.value = '';
    });
    return element.find('#PageIndex').change(function(event) {
      if (me.AlphaNumericValidator(this.value) && parseInt(this.value) <= parseInt(this.nextSibling.nextSibling.innerHTML) && parseInt(this.value) > 0) {
        ($(me.element)).find('tr[id^="row_"]').attr({
          style: "display:none"
        });
        return ($(me.element)).find(".Page" + this.value).attr({
          style: "display:block"
        });
      } else {
        return this.value = '';
      }
    });
  };

  ccDmrSelector.prototype.SwitchtoPanel = function(Selected, Cleared) {
    if (Cleared === 1) {
      ($(this.element)).find('.' + this.css.SelectedRow).removeClass(this.css.SelectedRow);
      this.options.Default = 0;
      ($(this.element[0].children[0])).find('img').attr({
        style: "display:none"
      });
      ($(this.element[0].children[0])).find('label').attr({
        style: "display:none"
      });
    } else if (this.options.Default !== 0) {
      ($(this.element)).find('.' + this.css.SinglePanelBase).find('img').attr({
        style: "display:block"
      }).attr("src", this.options.Icon_Path + this.options.dmr_list[this.options.Default - 1].logo_id + ".png");
      ($(this.element)).find('.' + this.css.SinglePanelBase).find('label').attr({
        style: "display:block"
      }).text(this.options.dmr_list[this.options.Default - 1].account_name);
      elementClicked(this.options.Default);
    }
    ($(this.element)).find('.' + this.css.PopupPanelBase).attr({
      style: "display:none"
    });
    return ($(this.element)).find('.' + this.css.SinglePanelBase).attr({
      style: "display:block"
    });
  };

  ccDmrSelector.prototype.SwitchtoSelector = function(Selected) {
    ($(this.element)).find("#NoElement").attr({
      style: "display:none"
    });
    ($(this.element)).find('tr[id^="row_"]').attr({
      style: "display:none"
    });
    ($(this.element)).find(".Page1").attr({
      style: "display:block"
    });
    ($(this.element)).find("#PageIndex").val('1');
    ($(this.element)).find('.' + this.css.PopupPanelBase).attr({
      style: "display:block"
    });
    return ($(this.element)).find('.' + this.css.SinglePanelBase).attr({
      style: "display:none"
    });
  };

  ccDmrSelector.prototype.Search = function(SearchWord) {
    ($(this.element)).find('tr[id^="row_"]').attr({
      style: "display:none"
    });
    if (($(this.element)).find('tr[id^="row_' + SearchWord + '"]').length === 0) {
      return ($(this.element)).find("#NoElement").attr({
        style: "display:block"
      });
    } else {
      ($(this.element)).find("#NoElement").attr({
        style: "display:none"
      });
      return ($(this.element)).find('tr[id^="row_' + SearchWord + '"]').attr({
        style: "display:block"
      });
    }
  };

  ccDmrSelector.prototype.AlphaNumericValidator = function(entry) {
    if (isNaN(entry)) {
      return 0;
    } else {
      return 1;
    }
  };

  ccDmrSelector.prototype.PageChange = function(PresentPage, TotalPages, UpDown) {
    ($(this.element)).find("#NoElement").attr({
      style: "display:none"
    });
    if ((PresentPage === 1 && UpDown === 0) || (PresentPage === TotalPages && UpDown === 1)) {
      return false;
    } else {
      ($(this.element)).find(".Page" + PresentPage).attr({
        style: "display:none"
      });
      if (UpDown === 1) {
        PresentPage++;
      } else {
        PresentPage--;
      }
      ($(this.element)).find(".Page" + PresentPage).attr({
        style: "display:block"
      });
      return true;
    }
  };

  ccDmrSelector.prototype.options = {
    dns_name: "Default",
    dmr_list: [],
    Icon_Path: "images/Icons/",
    Title: "Select DMR",
    Default: 0,
    EmptyMessage: "There are no DMR associations for this content Provider",
    EmptySearchMessage: "No Elements to display",
    PageNationLimit: 10
  };

  ccDmrSelector.prototype.css = {
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
    PopupPanelBase: 'popuppanelbase',
    LogoName: 'LogoName',
    SelectedRow: 'selectedRow'
  };

  return ccDmrSelector;

})();

$.widget("cc.ccDmrSelector", new ccDmrSelector);

elementClicked = function(Elementid) {
  return ccDmrSelector_Clicked(Elementid);
};
}).call(this);

