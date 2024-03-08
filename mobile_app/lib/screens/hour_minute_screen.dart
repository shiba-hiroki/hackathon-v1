import 'package:flutter/material.dart';

class TimePicker extends StatefulWidget {
  final Function(TimeOfDay) onTimeSelected;

  TimePicker({required this.onTimeSelected});

  @override
  _TimePickerState createState() => _TimePickerState();
}

class _TimePickerState extends State<TimePicker> {
  late TimeOfDay _selectedTime;
  late final Function(TimeOfDay) onTimeSelected;

  @override
  void initState() {
    super.initState();
    onTimeSelected = widget.onTimeSelected;
    _selectedTime = TimeOfDay(hour: 0, minute: 0);
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            _buildDrumRoll(
              values: List.generate(24, (index) => index),
              onChanged: (value) {
                setState(() {
                  onTimeSelected(
                      TimeOfDay(hour: value, minute: _selectedTime.minute));
                  _selectedTime =
                      TimeOfDay(hour: value, minute: _selectedTime.minute);
                });
              },
            ),
            Text(':'),
            _buildDrumRoll(
              values: List.generate(60, (index) => index),
              onChanged: (value) {
                setState(() {
                  _selectedTime =
                      TimeOfDay(hour: _selectedTime.hour, minute: value);
                });
              },
            ),
          ],
        ),
      ],
    );
  }


  Widget _buildDrumRoll(
      {required List<int> values, required Function(int) onChanged}) {
    return Container(
      height: 100,
      width: 50,
      child: ListWheelScrollView(
        itemExtent: 50,
        physics: FixedExtentScrollPhysics(),
        children: values.map((value) {
          return Center(
            child: Text(
              value.toString().padLeft(2, '0'),
              style: TextStyle(fontSize: 20),
            ),
          );
        }).toList(),
        onSelectedItemChanged: (index) {
          onChanged(values[index]);
        },
      ),
    );
  }
}
