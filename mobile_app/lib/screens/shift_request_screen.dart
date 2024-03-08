import 'dart:convert';

import "package:flutter/material.dart";
import 'package:http/http.dart' as http;
import 'package:mobile_app/screens/year_month_screen.dart';
import 'package:mobile_app/screens/date_shiftRequest.dart';

class ShiftRequestScreen extends StatefulWidget {
  final String sessionID;
  final String userID;
  const ShiftRequestScreen({
    required this.sessionID,
    required this.userID,
    super.key,
  });

  @override
  State<ShiftRequestScreen> createState() => _ShiftRequestScreenState();
}

class _ShiftRequestScreenState extends State<ShiftRequestScreen> {
  late final String _userID;
  late final String _sessionID;
  late int _year;
  late int _month;

  @override
  void initState() {
    super.initState();
    DateTime firstDayOfNextMonth =
        DateTime(DateTime.now().year, DateTime.now().month + 1, 1);
    _userID = widget.userID;
    _sessionID = widget.sessionID;
    _year = firstDayOfNextMonth.year;
    _month = firstDayOfNextMonth.month;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        child: Column(
          children: <Widget>[
            Expanded(
              child: DateScreen(
                year: _year,
                month: _month,
                patchShiftRequest: patchShiftRequest,
              ),
            ),
          ],
        ),
      ),
    );
  }

  Future<String> patchShiftRequest(
      String year, String month, List<List<String>> shiftRequest) async {
    final List<List<String>> requestBody = [];
    shiftRequest.asMap().forEach((index, shift) {
      if (shift[0] != shift[1]) {
        String start =
            '$year-${month.padLeft(2, "0")}-${(index + 1).toString().padLeft(2, "0")}T${shift[0]}:00+09:00';
        String end =
            '$year-${month.padLeft(2, "0")}-${(index + 1).toString().padLeft(2, "0")}T${shift[1]}:00+09:00';
        requestBody.add([start, end]);
      }
    });

    final uri = Uri.https(
        'backend.koki20001206.workers.dev', '/api/employee/shiftRequest', {
      'year': year,
      'month': month.padLeft(2, "0"),
    });
    final http.Response res = await http.patch(uri,
        headers: {
          'Authorization': 'Bearer $_sessionID',
          'Content-type': 'application/json'
        },
        body: jsonEncode(requestBody));

    if (res.statusCode == 200) {
      return res.body;
    } else {
      print(res.body);
      throw Exception('Failed to patch requestShift');
    }
  }

  Future<void> _updateState(int year, int month) async {
    setState(() {
      _year = year;
      _month = month;
    });
  }
}
