import "package:flutter/material.dart";
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:mobile_app/models/attendance.dart';
import 'package:mobile_app/models/confirmedShift.dart';
import 'package:mobile_app/screens/year_month_screen.dart';
import 'package:mobile_app/screens/date_confirmedShift_screen.dart';

class ConfirmedShiftScreen extends StatefulWidget {
  final String sessionID;
  final String userID;
  const ConfirmedShiftScreen({
    required this.sessionID,
    required this.userID,
    super.key,
  });

  @override
  State<ConfirmedShiftScreen> createState() => _ConfirmedShiftScreenState();
}

class _ConfirmedShiftScreenState extends State<ConfirmedShiftScreen> {
  List<Attendance> _attendances = [];
  late final String _userID;
  late final String _sessionID;
  int _year = DateTime.now().year;
  int _month = DateTime.now().month;

  @override
  void initState() {
    super.initState();
    _userID = widget.userID;
    _sessionID = widget.sessionID;
    _initializeAttendances();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        actions: [
          YearMonthPicker(
            onChanged: (year, month) {
              _updateAttendances(year, month);
            },
          ),
        ],
      ),
      body: Container(
        child: Column(
          children: <Widget>[
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Padding(
                  padding: const EdgeInsets.symmetric(
                    vertical: 12,
                    horizontal: 36,
                  ),
                  child: Text(
                    _userID,
                    style: const TextStyle(
                      fontSize: 20,
                    ),
                  ),
                ),
                const Padding(
                  padding: EdgeInsets.symmetric(
                    vertical: 12,
                    horizontal: 36,
                  ),
                  child: Text(
                    'さんの確定済みシフト',
                    style: TextStyle(
                      fontSize: 16,
                    ),
                  ),
                ),
              ],
            ),
            Expanded(
              child: DateScreen(
                year: _year,
                month: _month,
                attendances: _attendances,
              ),
            ),
          ],
        ),
      ),
    );
  }

  Future<List<Attendance>> getAttendances(String year, String month) async {
    final uri = Uri.https(
        'backend.koki20001206.workers.dev', '/api/employee/confirmedShift', {
      'year': year,
      'month': month.padLeft(2, "0"),
    });
    final http.Response res = await http.get(uri, headers: {
      'Authorization': 'Bearer $_sessionID',
      'Content-type': 'application/json'
    });


    if (res.statusCode == 200) {
      return translateConfirmedShiftToAttendances(jsonDecode(res.body));
    } else {
      throw Exception('Failed to get confirmedShift');
    }
  }

  List<Attendance> translateConfirmedShiftToAttendances(dynamic cs) {
    List<Attendance> results = [];
    cs.forEach((times) {
      results.add(Attendance(time: times[0], state: 'checkIn'));
      results.add(Attendance(time: times[1], state: 'checkOut'));
    });
    return results;
  }

  Future<void> _updateAttendances(int year, int month) async {
    final results = await getAttendances(year.toString(), month.toString());
    setState(() {
      _attendances = results;
      _year = year;
      _month = month;
    });
  }

  Future<void> _initializeAttendances() async {
    final results = await getAttendances(_year.toString(), _month.toString());
    setState(() {
      _attendances = results;
    });
  }
}
