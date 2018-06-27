var options = {};

$(document).on('input', '.autocomplete', function(event){
	options_array = [];
	this_id = $(this).attr('id');
	if(event.originalEvent.data == '['){
		if ($(this).val() != ""){	
			if(options[this_id] == null){
				source = $(this).data('suggestions');
				$.ajax({
					url: source + '.txt',
					method: 'get',
					success: function(data){
						options[this_id] = getRefinedList(data);
					}
				});
			}
		}
		else{
			$(this).next().html("");
		}
	}
	else{
		bracket_arr = $(this).val().split('[');
		if (bracket_arr.length > 1){
			last_bracket = bracket_arr[bracket_arr.length - 1];
			if(last_bracket.indexOf(']') < 0){
				$(this).next().html("");
				for (i=0;i < options[this_id].length;i++){
					if(options[this_id][i].indexOf(last_bracket) > -1){
						$(this).next().prepend("<p>" + options[this_id][i] + "</p>");
					}
				}
			}
			else{
				$(this).next().html("");
			}
		}
	}
	if($(this).val() == ""){
		$(this).next().html("");
	}
});

function setOption(var_name, data){
	options[var_name] = data;
}

function getRefinedList(str){
	temp_options = [];
	options_arr = str.split(',')
	for (i = 0;i < options_arr.length;i++){
		temp_options.push(options_arr[i].slice(1, -1));
	}
	return temp_options;
}

$(document).on("click", ".suggestions p", function(){
	input_val = $(this).parent().prev().val();
	last_bracket = bracket_arr[bracket_arr.length - 1];
	this_val = $(this).text();
	new_val = input_val.slice(0, -1 * last_bracket.length) + this_val + '] ';
	$(this).parent().prev().focus();
	$(this).parent().prev().val(new_val);
	$(this).parent().html("");
});