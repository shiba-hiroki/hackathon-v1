import 'package:flutter/material.dart';

class YearMonthPicker extends StatefulWidget {
  YearMonthPicker({
    required this.onChanged,
  });

  final int initialYear = DateTime.now().year;
  final int initialMonth = DateTime.now().month;
  final Function(int year, int month) onChanged;

  @override
  _YearMonthPickerState createState() => _YearMonthPickerState();
}

class _YearMonthPickerState extends State<YearMonthPicker> {
  late int _selectedYear;
  late int _selectedMonth;

  @override
  void initState() {
    super.initState();
    _selectedYear = widget.initialYear;
    _selectedMonth = widget.initialMonth;
  }

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        _buildDropdownButton(_buildYearItems(), _selectedYear, (value) {
          setState(() {
            _selectedYear = value as int;
            widget.onChanged(_selectedYear, _selectedMonth);
          });
        }),
        SizedBox(width: 16),
        _buildDropdownButton(_buildMonthItems(), _selectedMonth, (value) {
          setState(() {
            _selectedMonth = value as int;
            widget.onChanged(_selectedYear, _selectedMonth);
          });
        }),
      ],
    );
  }

  Widget _buildDropdownButton(List<DropdownMenuItem<int>> items, int value,
      Function(dynamic) onChanged) {
    return DropdownButton<int>(
      value: value,
      items: items,
      onChanged: onChanged,
    );
  }

  List<DropdownMenuItem<int>> _buildYearItems() {
    List<DropdownMenuItem<int>> items = [];
    for (int year = 2000; year <= 2030; year++) {
      items.add(DropdownMenuItem<int>(
        value: year,
        child: Text('$year年'),
      ));
    }
    return items;
  }

  List<DropdownMenuItem<int>> _buildMonthItems() {
    List<DropdownMenuItem<int>> items = [];
    for (int month = 1; month <= 12; month++) {
      items.add(DropdownMenuItem<int>(
        value: month,
        child: Text('$month月'),
      ));
    }
    return items;
  }
}
